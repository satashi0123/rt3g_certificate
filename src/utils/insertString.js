export default function insertString(originalUrl, insertPart, after) {
  const insertPosition = originalUrl.indexOf(after) + after.length;
  return (
    originalUrl.slice(0, insertPosition) +
    insertPart +
    originalUrl.slice(insertPosition)
  );
}
