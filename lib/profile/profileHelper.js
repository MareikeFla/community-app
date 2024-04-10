// Arr with user infos is used for mapping to reduce repitation

export function formatedUserInfo(session) {
  return [
    {
      key: "image",
      text: "Profilbiild",
      value: session?.user?.image,
      isRequired: false,
    },
    { key: "name", text: "Name", value: session?.user?.name, isRequired: true },
    {
      key: "email",
      text: "E-Mail",
      value: session?.user?.email,
      isRequired: false,
    },
  ];
}
