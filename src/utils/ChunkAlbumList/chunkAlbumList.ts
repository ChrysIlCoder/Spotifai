export const getChunksFromAlbumsList = (array: any, chunkSize: any) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize) as never);
  }
  return chunks;
};