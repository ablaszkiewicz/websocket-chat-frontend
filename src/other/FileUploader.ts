import { AES } from 'crypto-js';
import { splitStringIntoChunks } from './Splitter';

export async function readFile(file: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsBinaryString(file);

    reader.onload = async () => {
      const chunks = splitStringIntoChunks(reader.result as string, 10240);
      resolve(chunks);
    };

    reader.onerror = reject;
  });
}
