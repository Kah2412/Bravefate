const Book = require('../models/Book');

const curatedBooks = [
  {
    title: 'Mulheres que Correm com os Lobos',
    author: 'Clarissa Pinkola Estés',
    description: 'Histórias de mulheres sábias que encontram sua força interior e independência.',
    category: 'autoestima',
    link: 'https://www.skoob.com.br/mulheres-que-correm-com-os-lobos-3819ed44795.html'
  },
  {
    title: 'Por que Ele Faz Isto?',
    author: 'Lundy Bancroft',
    description: 'Compreender o comportamento de homens que abusam suas parceiras e identificar sinais.',
    category: 'abuso',
    link: 'https://www.skoob.com.br/por-que-ele-faz-isto-3792ed44595.html'
  },
  {
    title: 'O Corpo Guarda as Marcas',
    author: 'Bessel van der Kolk',
    description: 'Como traumas ficam armazenados no corpo e como tratá-los com segurança.',
    category: 'cura',
    link: 'https://www.skoob.com.br/o-corpo-guarda-as-marcas-3810ed44785.html'
  },
  {
    title: 'O Segundo Sexo',
    author: 'Simone de Beauvoir',
    description: 'Obra fundamental sobre a condição da mulher e sua liberdade.',
    category: 'lideranca',
    link: 'https://www.skoob.com.br/o-segundo-sexo-3801ed44776.html'
  },
  {
    title: 'A Coragem de Ser Imperfeita',
    author: 'Brené Brown',
    description: 'Descobrir vulnerabilidade, autenticidade e como começar de novo.',
    category: 'recomeço',
    link: 'https://www.skoob.com.br/a-coragem-de-ser-imperfeita-3773ed44588.html'
  },
  {
    title: 'Mulheres na Ciência',
    author: 'Rachel Ignotofsky',
    description: 'Uma celebração ilustrada das mulheres que mudaram a ciência.',
    category: 'ciencia',
    link: 'https://www.skoob.com.br/mulheres-na-ciencia-3951ed44799.html'
  }
];

const validateImageUrl = async (url) => {
  if (!url) return false;

  try {
    new URL(url);
  } catch {
    return false;
  }

  if (typeof fetch !== 'function') return true;

  try {
    const response = await fetch(url, { method: 'HEAD', cache: 'no-store' });
    if (!response.ok) return false;
    const contentType = response.headers.get('content-type') || '';
    return contentType.startsWith('image/');
  } catch {
    try {
      const response = await fetch(url, { method: 'GET', cache: 'no-store' });
      if (!response.ok) return false;
      const contentType = response.headers.get('content-type') || '';
      return contentType.startsWith('image/');
    } catch {
      return false;
    }
  }
};

const googleBooksApiKey = process.env.GOOGLE_BOOKS_API_KEY || '';

const fetchGoogleBook = async (query) => {
  const sanitized = encodeURIComponent(query);
  const url = `https://www.googleapis.com/books/v1/volumes?q=${sanitized}&maxResults=5${googleBooksApiKey ? `&key=${googleBooksApiKey}` : ''}`;

  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.warn('Google Books fetch failed:', error);
    return null;
  }
};

const fetchOpenLibraryBook = async (title, author) => {
  const query = new URLSearchParams({ title, author, limit: '1' });
  const url = `https://openlibrary.org/search.json?${query}`;

  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.warn('Open Library fetch failed:', error);
    return null;
  }
};

const extractGoogleBookData = (item) => {
  const volumeInfo = item.volumeInfo || {};
  const imageLinks = volumeInfo.imageLinks || {};
  const coverUrl = imageLinks.large || imageLinks.extraLarge || imageLinks.thumbnail || imageLinks.smallThumbnail;
  const thumbnailUrl = imageLinks.smallThumbnail || coverUrl;

  return {
    title: volumeInfo.title || '',
    author: (volumeInfo.authors && volumeInfo.authors.join(', ')) || 'Desconhecido',
    description: volumeInfo.description || volumeInfo.subtitle || '',
    link: volumeInfo.infoLink || '',
    coverUrl: coverUrl ? coverUrl.replace(/^http:/, 'https:') : '',
    thumbnailUrl: thumbnailUrl ? thumbnailUrl.replace(/^http:/, 'https:') : '',
    sourceApi: 'GoogleBooks',
    externalId: item.id
  };
};

const extractOpenLibraryData = (doc) => {
  const coverId = doc.cover_i;
  const openLibId = doc.edition_key?.[0] || doc.key;
  const imageUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : `https://covers.openlibrary.org/b/olid/${openLibId}-L.jpg`;

  return {
    title: doc.title || '',
    author: doc.author_name ? doc.author_name.join(', ') : 'Desconhecido',
    description: doc.first_sentence ? (doc.first_sentence[0] || '') : '',
    link: openLibId ? `https://openlibrary.org${doc.key}` : '',
    coverUrl: imageUrl,
    thumbnailUrl: imageUrl,
    sourceApi: 'OpenLibrary',
    externalId: openLibId
  };
};

const normalizeBookPayload = async (book) => {
  const sanitizedTitle = book.title.trim();
  const sanitizedAuthor = book.author.trim();

  const existing = await Book.findOne({
    title: new RegExp(`^${sanitizedTitle.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i'),
    author: new RegExp(`^${sanitizedAuthor.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i')
  });

  const result = {
    title: sanitizedTitle,
    author: sanitizedAuthor || 'Desconhecido',
    description: book.description || '',
    category: book.category || 'autoestima',
    link: book.link || '',
    coverUrl: '',
    thumbnailUrl: '',
    sourceApi: '',
    externalId: '',
    validatedImage: false
  };

  if (existing) {
    if (existing.coverUrl && !existing.validatedImage) {
      const valid = await validateImageUrl(existing.coverUrl);
      if (valid) {
        existing.validatedImage = true;
        await existing.save();
      }
    }
    return existing;
  }

  let externalData = null;

  if (book.title) {
    const googlePayload = await fetchGoogleBook(`${book.title} ${book.author}`.trim());
    if (googlePayload?.items?.length) {
      for (const item of googlePayload.items) {
        const candidate = extractGoogleBookData(item);
        if (candidate.coverUrl && await validateImageUrl(candidate.coverUrl)) {
          externalData = candidate;
          break;
        }
      }
    }
  }

  if (!externalData) {
    const openLibPayload = await fetchOpenLibraryBook(book.title, book.author);
    if (openLibPayload?.docs?.length) {
      const candidate = extractOpenLibraryData(openLibPayload.docs[0]);
      if (candidate.coverUrl && await validateImageUrl(candidate.coverUrl)) {
        externalData = candidate;
      }
    }
  }

  if (externalData) {
    result.coverUrl = externalData.coverUrl;
    result.thumbnailUrl = externalData.thumbnailUrl;
    result.sourceApi = externalData.sourceApi;
    result.externalId = externalData.externalId;
    result.validatedImage = true;
    if (!result.link && externalData.link) {
      result.link = externalData.link;
    }
  }

  const document = new Book(result);
  await document.save();
  return document;
};

const findBooksByQuery = async ({ search, category }) => {
  const query = {};

  if (category) {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  return Book.find(query).sort({ createdAt: -1 }).lean();
};

const seedCuratedBooks = async () => {
  const existingCount = await Book.countDocuments();
  if (existingCount > 0) return;
  await Promise.all(curatedBooks.map((book) => normalizeBookPayload(book)));
};

exports.getBooks = async ({ search, category }) => {
  await seedCuratedBooks();
  const books = await findBooksByQuery({ search, category });
  if (books.length) return books;

  if (search) {
    const predictedBook = { title: search, author: '', description: '', category: category || 'autoestima', link: '' };
    const external = await normalizeBookPayload(predictedBook);
    return external ? [external] : [];
  }

  return books;
};

exports.getBookCategories = () => curatedBooks.map((item) => ({ id: item.category, label: item.category }));
