import { Message } from './Message';

export interface TextMessage extends Message {
  message: string;
}
