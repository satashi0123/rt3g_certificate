export default function capitalizeFullname(fullName) {
  // Trim spaces at the start and end
  let trimmedName = fullName.trim();

  // Capitalize the first letter of each word
  let capitalizedName = trimmedName
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");

  // Convert to URL encoded string
  // console.log(capitalizedName);
  let urlEncoded = encodeURIComponent(capitalizedName);
  // console.log("encoded Url");
  // console.log(urlEncoded);

  return urlEncoded;
}
