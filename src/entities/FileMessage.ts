import { Message } from './Message';

export interface FileMessage extends Message {
  name: string;
  extension: string;
  content?: string;
  mimeType: string;
  isMeta: boolean;
  partsCount: number;
  currentPart: number;
}
