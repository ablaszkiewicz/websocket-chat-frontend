import { Message } from './Message';

export interface FilePartMessage extends Message {
  name: string;
  content?: string;
  currentPart: number;
}

export interface FileMetaMessage extends Message {
  name: string;
  extension: string;
  mimeType: string;
  partsCount: number;
}
