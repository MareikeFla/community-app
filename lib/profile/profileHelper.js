// Array with user infos is used for mapping to reduce repitation
const pictureSize = 128;

export function formatedUserInfo(session) {
  const profilePicture = {
    key: "image",
    text: "Profilbild",
    value: session?.user?.image,
    isRequired: false,
    pictureSize,
  };

  const name = {
    key: "name",
    text: "Name",
    value: session?.user?.name,
    isRequired: true,
  };

  const additionalInfo = [
    {
      key: "email",
      text: "E-Mail",
      value: session?.user?.email,
      isRequired: false,
    },
  ];

  return { profilePicture, name, additionalInfo };
}
