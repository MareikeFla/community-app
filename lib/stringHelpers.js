export function turnAddressToEditIntoString(item) {
  const { location } = item;
  const { street, houseNumber, zip, city } = location;
  const addressParts = [
    street || "",
    houseNumber || "",
    zip ? `, ${zip}` : "",
    city || "",
  ].filter(Boolean);

  return addressParts.join(" ").trim();
}
