import { QueryDocumentSnapshot } from 'firebase/firestore';

export const firebaseConverter = <T>() => {
  return {
    toFirestore: (data: T) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
  };
};
