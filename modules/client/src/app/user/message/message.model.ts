import {MessageState} from "./model/message-state";

export interface MessageModel {
  TELEPHONE_NUMBER: string,
  MESSAGE_TEXT: string,
  DATE: string,
  STATE: string|MessageState,
  USER_ID: string
}
