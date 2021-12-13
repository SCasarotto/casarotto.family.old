import { useState, useEffect } from 'react';

import {
  getDownloadUrlWithReties,
  GetDownloadUrlWithRetriesData,
} from 'helpers';

export const useDownloadUrlWithRetries = (
  data: GetDownloadUrlWithRetriesData,
) => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    const getUrl = async () => {
      const url = await getDownloadUrlWithReties(data);
      setUrl(url);
    };
    getUrl();
  }, [data]);

  return url;
};
