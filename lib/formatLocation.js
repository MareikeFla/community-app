export function locationToString(location) {
  const { street, houseNumber, zip, city } = location;
  return `${street || ""} ${houseNumber || ""}${street && ","} ${zip || ""} ${
    city || ""
  }`;
}
