import { useI18n, type Locale } from "@/i18n";

const languages: Locale[] = ["pt", "en", "es"];

const LanguageSwitcher = ({ mobile = false }: { mobile?: boolean }) => {
  const { language, setLanguage } = useI18n();

  return (
    <div
      className={`flex items-center rounded-full border border-border ${
        mobile ? "w-full justify-center bg-background/60 p-1" : "bg-background/60 p-1"
      }`}
    >
      {languages.map((locale) => (
        <button
          key={locale}
          onClick={() => setLanguage(locale)}
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase transition-colors ${
            language === locale ? "gradient-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {locale}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
