export const navigationEntries = [
  {
    text: "Home",
    href: "/",
    requireSession: false,
  },
  {
    text: "Event erstellen",
    href: "/events/new",
    requireSession: true,
  },
  {
    text: "Mein Profil",
    href: "/profile",
    requireSession: true,
  },
  {
    text: "Erstellte Events",
    href: "/profile?openSection=0",
    requireSession: true,
  },
  {
    text: "Meine Merkliste",
    href: "/profile?openSection=1",
    requireSession: true,
  },
];
