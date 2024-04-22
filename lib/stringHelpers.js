export function turnAddressToEditIntoString(item) {
  const addressParts = [
    item?.location?.street || "",
    item?.location?.houseNumber || "",
    item?.location?.houseNumber && item?.location?.zip
      ? `, ${item?.location?.zip}`
      : item?.location?.zip || "",
    item?.location?.city || "",
  ].filter(Boolean);

  return addressParts.join(" ").trim();
}
