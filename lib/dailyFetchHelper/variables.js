export const adminID = process.env.ADMIN_ID;
export const koelnDB = "Köln";
export const ourDB = "pinAndJoin";
export const koelnCategoriesUrl =
  "https://www.stadt-koeln.de/externe-dienste/open-data/events-od.php?&type=listkat";
export const ourCategoriesUrl =
  "https://community-app-topaz.vercel.app/api/categories";
export const ourEventsUrl = "https://community-app-topaz.vercel.app/api/events";
export const metainfoUrl =
  "https://community-app-topaz.vercel.app/api/metainfo";
export const a11yIconsUrl =
  "https://community-app-topaz.vercel.app/api/a11yicons";

export const categoryRelation = [
  {
    category: "Ausstellung",
    assignTo: "Kunst & Kultur",
    assignToSubCategory: "Ausstellung & Galerie",
  },
  {
    category: "Film",
    assignTo: "Kunst & Kultur",
    assignToSubCategory: "Film & Kino",
  },
  { category: "Führung", assignTo: "Kunst & Kultur" },
  { category: "Geschichte", assignTo: "Bildung & Wissen" },
  { category: "Historisches Archiv", assignTo: "Bildung & Wissen" },
  { category: "Interkulturelle Woche", assignTo: "Kunst & Kultur" },
  {
    category: "Kabarett",
    assignTo: "Kunst & Kultur",
    assignToSubCategory: "Theater & Performance",
  },
  {
    category: "Kleinkunst",
    assignTo: "Kunst & Kultur",
    assignToSubCategory: "Theater & Performance",
  },
  {
    category: "Konzerte/Musik",
    assignTo: "Kunst & Kultur",
    assignToSubCategory: "Musik & Konzerte",
  },
  { category: "Kultur", assignTo: "Kunst & Kultur" },
  { category: "Kultur auf dem Neumarkt", assignTo: "Kunst & Kultur" },
  {
    category: "Lesung",
    assignTo: "Kunst & Kultur",
  },
  {
    category: "Museum",
    assignTo: "Kunst & Kultur",
    assignToSubCategory: "Ausstellung & Galerie",
  },
  {
    category: "Tanz",
    assignTo: "Kunst & Kultur",
    assignToSubCategory: "Theater & Performance",
  },
  {
    category: "Theater",
    assignTo: "Kunst & Kultur",
    assignToSubCategory: "Theater & Performance",
  },
  { category: "Kinder + Jugend", assignTo: "Bildung & Wissen" },
  {
    category: "Umwelt und Grün",
    assignTo: "Aktivismus",
    assignToSubCategory: "Umweltschutz",
  },
  {
    category: "Natur und Grün",
    assignTo: "Aktivismus",
    assignToSubCategory: "Umweltschutz",
  },
  {
    category: "Nachhaltigkeit/Klimaschutz",
    assignTo: "Aktivismus",
    assignToSubCategory: "Umweltschutz",
  },
  { category: "Frauen + Gleichstellung", assignTo: "Aktivismus" },
  { category: "Familie", assignTo: "Bildung & Wissen" },
  { category: "Wissenschaft im Rathaus", assignTo: "Bildung & Wissen" },
  {
    category: "Vortrag",
    assignTo: "Bildung & Wissen",
    assignToSubCategory: "Vortrag",
  },
  { category: "Stadtbibliothek", assignTo: "Bildung & Wissen" },
  { category: "Historisches Archiv", assignTo: "Bildung & Wissen" },
  {
    category: "Existenzgründung",
    assignTo: "Bildung & Wissen",
    assignToSubCategory: "Workshop",
  },
  { category: "Digital", assignTo: "Bildung & Wissen" },
  {
    category: "Gesundheit",
    assignTo: "Sport & Fitness",
    assignToSubCategory: "Fitnesskurs",
  },
  { category: "Sport", assignTo: "Sport & Fitness" },
];
