const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category: { type: String, required: true, trim: true },
  link: { type: String, required: true, trim: true },
  coverUrl: { type: String, trim: true, default: '', alias: 'cover_url' },
  thumbnailUrl: { type: String, trim: true, default: '', alias: 'thumbnail_url' },
  sourceApi: { type: String, trim: true, default: '', alias: 'source_api' },
  externalId: { type: String, trim: true, default: '', alias: 'external_id' },
  validatedImage: { type: Boolean, default: false, alias: 'validated_image' },
  createdAt: { type: Date, default: Date.now, alias: 'created_at' },
  updatedAt: { type: Date, default: Date.now, alias: 'updated_at' }
});

bookSchema.index({ title: 1, author: 1 });
bookSchema.index({ category: 1 });

module.exports = mongoose.model('Book', bookSchema);
