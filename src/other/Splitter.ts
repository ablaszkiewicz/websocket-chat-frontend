export function splitStringIntoChunks(str: string, chunkSize: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < str.length; i += chunkSize) {
    chunks.push(str.substr(i, chunkSize));
  }
  return chunks;
}

//given non-empty array of integers, every element appears twice except for one. Find that one element
//that appears only once.
// You need to implement linear time and no additional space.
function findSingleElement(arr: number[]): number {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result = result ^ arr[i];
  }
  return result;
}
