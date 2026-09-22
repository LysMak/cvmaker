export const locales = ['cs', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'cs';

export interface Dictionary {
  siteName: string;
  home: {
    heroTitle: string;
    heroSubtitle: string;
    disclaimer: string;
    recentTitle: string;
    viewAllAction: string;
    viewAction: string;
    tabManual: string;
    tabPaste: string;
    pasteBadge: string;
    pasteUnavailable: string;
    pasteLabel: string;
    pastePlaceholder: string;
    pasteSubmit: string;
    pasteSubmitPending: string;
  };
  form: {
    nameLabel: string;
    namePlaceholder: string;
    headlineLabel: string;
    headlinePlaceholder: string;
    locationLabel: string;
    locationPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    driverLicenseLabel: string;
    driverLicensePlaceholder: string;
    aboutLabel: string;
    aboutPlaceholder: string;
    skillsLabel: string;
    skillsPlaceholder: string;
    languagesLabel: string;
    languagesPlaceholder: string;
    hobbiesLabel: string;
    hobbiesPlaceholder: string;
    educationSectionTitle: string;
    educationSchoolLabel: string;
    educationSchoolPlaceholder: string;
    educationDegreeLabel: string;
    educationDegreePlaceholder: string;
    educationPeriodLabel: string;
    educationPeriodPlaceholder: string;
    educationNoteLabel: string;
    educationNotePlaceholder: string;
    addEducation: string;
    certificatesSectionTitle: string;
    certTitleLabel: string;
    certTitlePlaceholder: string;
    certInstitutionLabel: string;
    certInstitutionPlaceholder: string;
    certDescriptionLabel: string;
    certDescriptionPlaceholder: string;
    addCertificate: string;
    removeAction: string;
    designSectionTitle: string;
    templateLabel: string;
    templateMinimal: string;
    templateModern: string;
    templateCreative: string;
    accentLabel: string;
    submitButton: string;
    submitPending: string;
  };
  cv: {
    profileTag: string;
    about: string;
    education: string;
    certificates: string;
    skills: string;
    languages: string;
    driverLicense: string;
    hobbies: string;
    notFoundTitle: string;
    notFoundBody: string;
    backHome: string;
    editAction: string;
    printAction: string;
    deleteAction: string;
    deleteConfirm: string;
    deletePending: string;
    editBannerTitle: string;
    editBannerBody: string;
    shareEmailPlaceholder: string;
    shareEmailButton: string;
    shareEmailSubject: string;
    shareEmailBody: string;
    customizeAction: string;
    saveDesignButton: string;
    savingDesign: string;
  };
  edit: {
    title: string;
    notAuthorizedTitle: string;
    notAuthorizedBody: string;
    saveButton: string;
    savePending: string;
  };
  footer: {
    demoNote: string;
    githubLabel: string;
    authorLabel: string;
  };
  all: {
    title: string;
    empty: string;
    prevPage: string;
    nextPage: string;
    pageInfo: string;
  };
}

const cs: Dictionary = {
  siteName: 'Fast CV Maker',
  home: {
    heroTitle: 'Proměňte své CV v profesionální webovou stránku',
    heroSubtitle: 'Vyplňte údaje níže — okamžitě je zpracujeme do přehledné osobní stránky.',
    disclaimer: 'Toto je pouze koncept / ukázkový projekt. Všechny vyplněné údaje zůstávají veřejně viditelné komukoliv na internetu. Nevyplňujte prosím citlivé nebo důležité osobní informace.',
    recentTitle: 'Naposledy vytvořené životopisy',
    viewAllAction: 'Zobrazit všechny životopisy →',
    viewAction: 'Zobrazit',
    tabManual: 'Vyplnit formulář',
    tabPaste: 'Vložit text CV',
    pasteBadge: 'Ve vývoji',
    pasteUnavailable: 'Tuto funkci autor stránky ještě dokončuje. Zatím prosím použijte formulář.',
    pasteLabel: 'Vložte text svého CV',
    pastePlaceholder: 'Vložte sem svůj životopis, popis zkušeností nebo text z LinkedIn — AI z něj sestaví stránku…',
    pasteSubmit: 'Vytvořit pomocí AI',
    pasteSubmitPending: 'Zpracováváme váš životopis…',
  },
  form: {
    nameLabel: 'Jméno a příjmení *',
    namePlaceholder: 'Vaše jméno a příjmení',
    headlineLabel: 'Pozice / specializace',
    headlinePlaceholder: 'Vaše pracovní pozice',
    locationLabel: 'Město',
    locationPlaceholder: 'Vaše město',
    phoneLabel: 'Telefon',
    phonePlaceholder: 'Vaše telefonní číslo',
    emailLabel: 'E-mail',
    emailPlaceholder: 'Váš e-mail',
    driverLicenseLabel: 'Řidičský průkaz',
    driverLicensePlaceholder: 'Skupina řidičského oprávnění',
    aboutLabel: 'O mně',
    aboutPlaceholder: 'Krátký popis vašich zkušeností a cílů',
    skillsLabel: 'Dovednosti (každá na nový řádek)',
    skillsPlaceholder: 'Každá dovednost na nový řádek',
    languagesLabel: 'Jazyky (každý na nový řádek)',
    languagesPlaceholder: 'Každý jazyk na nový řádek',
    hobbiesLabel: 'Zájmy (každý na nový řádek)',
    hobbiesPlaceholder: 'Každý zájem na nový řádek',
    educationSectionTitle: 'Vzdělání',
    educationSchoolLabel: 'Škola / instituce',
    educationSchoolPlaceholder: 'Název školy',
    educationDegreeLabel: 'Obor',
    educationDegreePlaceholder: 'Název oboru',
    educationPeriodLabel: 'Období',
    educationPeriodPlaceholder: 'Období studia',
    educationNoteLabel: 'Poznámka',
    educationNotePlaceholder: 'Doplňující informace',
    addEducation: '+ Přidat vzdělání',
    certificatesSectionTitle: 'Certifikáty a školení',
    certTitleLabel: 'Název',
    certTitlePlaceholder: 'Název certifikátu',
    certInstitutionLabel: 'Instituce',
    certInstitutionPlaceholder: 'Název instituce',
    certDescriptionLabel: 'Popis',
    certDescriptionPlaceholder: 'Co jste se naučili',
    addCertificate: '+ Přidat certifikát',
    removeAction: 'Odebrat',
    designSectionTitle: 'Vzhled stránky',
    templateLabel: 'Šablona',
    templateMinimal: 'Minimal',
    templateModern: 'Modern',
    templateCreative: 'Kreativní',
    accentLabel: 'Barva zvýraznění',
    submitButton: 'Vytvořit životopis',
    submitPending: 'Vytváříme váš životopis…',
  },
  cv: {
    profileTag: 'Profil CV',
    about: 'Představení',
    education: 'Vzdělání',
    certificates: 'Certifikáty a školení',
    skills: 'Znalosti a dovednosti',
    languages: 'Jazyky',
    driverLicense: 'Řidičský průkaz',
    hobbies: 'Zájmy a koníčky',
    notFoundTitle: 'Životopis nenalezen',
    notFoundBody: 'Odkaz, na který jste přišli, neexistuje nebo byl odstraněn.',
    backHome: '← Zpět na hlavní stránku',
    editAction: 'Upravit',
    printAction: 'Tisk / PDF',
    deleteAction: 'Smazat',
    deleteConfirm: 'Opravdu chcete tento životopis trvale smazat? Tuto akci nelze vrátit zpět.',
    deletePending: 'Mažeme…',
    editBannerTitle: 'Toto je váš životopis.',
    editBannerBody: 'Uložte si tento odkaz — jen s ním můžete stránku později upravit.',
    shareEmailPlaceholder: 'E-mail příjemce',
    shareEmailButton: 'Poslat e-mailem',
    shareEmailSubject: 'Životopis',
    shareEmailBody: 'Dobrý den,\n\nposílám odkaz na životopis:',
    customizeAction: '🎨 Vzhled',
    saveDesignButton: 'Uložit vzhled',
    savingDesign: 'Ukládáme…',
  },
  edit: {
    title: 'Upravit životopis',
    notAuthorizedTitle: 'Nemáte oprávnění',
    notAuthorizedBody: 'Odkaz pro úpravu je neplatný nebo chybí.',
    saveButton: 'Uložit změny',
    savePending: 'Ukládáme změny…',
  },
  footer: {
    demoNote: 'Toto je ukázkový projekt vytvořený jako demo, ne komerční služba.',
    githubLabel: 'Zdrojový kód na GitHubu',
    authorLabel: 'Autor',
  },
  all: {
    title: 'Všechny životopisy',
    empty: 'Zatím nebyl vytvořen žádný životopis.',
    prevPage: '← Předchozí',
    nextPage: 'Další →',
    pageInfo: 'Strana {current} z {total}',
  },
};

const en: Dictionary = {
  siteName: 'Fast CV Maker',
  home: {
    heroTitle: 'Turn your CV into a professional website',
    heroSubtitle: "Fill in the details below — we'll instantly turn them into a clear personal page.",
    disclaimer: "This is only a concept / demo project. Everything you enter stays publicly visible to anyone on the internet. Please don't enter sensitive or important personal information.",
    recentTitle: 'Recently created CVs',
    viewAllAction: 'View all CVs →',
    viewAction: 'View',
    tabManual: 'Fill in the form',
    tabPaste: 'Paste CV text',
    pasteBadge: 'In development',
    pasteUnavailable: "The site's creator is still building this feature. Please use the form for now.",
    pasteLabel: 'Paste your CV text',
    pastePlaceholder: "Paste your resume, a description of your experience, or your LinkedIn text — AI will build the page from it…",
    pasteSubmit: 'Create with AI',
    pasteSubmitPending: 'Processing your CV…',
  },
  form: {
    nameLabel: 'Full name *',
    namePlaceholder: 'Your full name',
    headlineLabel: 'Position / specialization',
    headlinePlaceholder: 'Your job title',
    locationLabel: 'City',
    locationPlaceholder: 'Your city',
    phoneLabel: 'Phone',
    phonePlaceholder: 'Your phone number',
    emailLabel: 'Email',
    emailPlaceholder: 'Your email address',
    driverLicenseLabel: "Driving licence",
    driverLicensePlaceholder: 'Driving licence category',
    aboutLabel: 'About me',
    aboutPlaceholder: 'A short description of your experience and goals',
    skillsLabel: 'Skills (one per line)',
    skillsPlaceholder: 'One skill per line',
    languagesLabel: 'Languages (one per line)',
    languagesPlaceholder: 'One language per line',
    hobbiesLabel: 'Hobbies (one per line)',
    hobbiesPlaceholder: 'One hobby per line',
    educationSectionTitle: 'Education',
    educationSchoolLabel: 'School / institution',
    educationSchoolPlaceholder: 'School name',
    educationDegreeLabel: 'Field of study',
    educationDegreePlaceholder: 'Your field of study',
    educationPeriodLabel: 'Period',
    educationPeriodPlaceholder: 'Study period',
    educationNoteLabel: 'Note',
    educationNotePlaceholder: 'Additional information',
    addEducation: '+ Add education',
    certificatesSectionTitle: 'Certificates & training',
    certTitleLabel: 'Title',
    certTitlePlaceholder: 'Certificate name',
    certInstitutionLabel: 'Institution',
    certInstitutionPlaceholder: 'Institution name',
    certDescriptionLabel: 'Description',
    certDescriptionPlaceholder: 'What you learned',
    addCertificate: '+ Add certificate',
    removeAction: 'Remove',
    designSectionTitle: 'Page design',
    templateLabel: 'Template',
    templateMinimal: 'Minimal',
    templateModern: 'Modern',
    templateCreative: 'Creative',
    accentLabel: 'Accent colour',
    submitButton: 'Create my CV',
    submitPending: 'Creating your CV…',
  },
  cv: {
    profileTag: 'CV Profile',
    about: 'About',
    education: 'Education',
    certificates: 'Certificates & Training',
    skills: 'Skills',
    languages: 'Languages',
    driverLicense: 'Driving Licence',
    hobbies: 'Interests & Hobbies',
    notFoundTitle: 'CV not found',
    notFoundBody: "The link you followed doesn't exist or has been removed.",
    backHome: '← Back to homepage',
    editAction: 'Edit',
    printAction: 'Print / PDF',
    deleteAction: 'Delete',
    deleteConfirm: 'Are you sure you want to permanently delete this CV? This action cannot be undone.',
    deletePending: 'Deleting…',
    editBannerTitle: 'This is your CV.',
    editBannerBody: 'Save this link — it is the only way to edit this page later.',
    shareEmailPlaceholder: "Recipient's email",
    shareEmailButton: 'Send by email',
    shareEmailSubject: 'CV',
    shareEmailBody: 'Hello,\n\nhere is the link to the CV:',
    customizeAction: '🎨 Design',
    saveDesignButton: 'Save design',
    savingDesign: 'Saving…',
  },
  edit: {
    title: 'Edit CV',
    notAuthorizedTitle: 'Not authorized',
    notAuthorizedBody: 'The edit link is invalid or missing.',
    saveButton: 'Save changes',
    savePending: 'Saving changes…',
  },
  footer: {
    demoNote: 'This is a demo project built as a showcase, not a commercial service.',
    githubLabel: 'Source code on GitHub',
    authorLabel: 'Author',
  },
  all: {
    title: 'All CVs',
    empty: 'No CVs have been created yet.',
    prevPage: '← Previous',
    nextPage: 'Next →',
    pageInfo: 'Page {current} of {total}',
  },
};

export const dictionaries: Record<Locale, Dictionary> = { cs, en };

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale as Locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
