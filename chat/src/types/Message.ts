import { FieldValue } from '@firebase/firestore';

// TODO: Consider trying to do this with nested collection...
// export type ReadRecept = { userUid: string; dateRead: number };

export type RawMessage = {
  dateCreated: number;
  senderUid: string;
  message: string;
  // readReceiptArray: Array<ReadRecept>;
};
export type Message = RawMessage & {
  uid: string;
};

export type RawMessageCreate = Omit<RawMessage, 'dateCreated'> & {
  dateCreated: FieldValue;
};
