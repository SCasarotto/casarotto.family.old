import { QueryDocumentSnapshot } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

export const firebaseConverter = <T>() => {
  return {
    toFirestore: (data: T) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
  };
};

// Consider improving by checking the error code and handling it anther way
export type GetDownloadUrlWithRetriesData = {
  path: string;
  retries?: number;
  delay?: number;
};
export const getDownloadUrlWithReties = async (
  data: GetDownloadUrlWithRetriesData,
) => {
  const { path, retries = 3, delay = 250 } = data;
  let url: string | undefined = undefined;
  let retryCount = 0;
  while (retryCount < retries && !url) {
    try {
      url = await getDownloadURL(ref(getStorage(), path));
    } catch (e) {
      retryCount++;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  return url;
};
