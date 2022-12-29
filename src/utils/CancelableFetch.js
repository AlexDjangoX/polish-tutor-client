import { useEffect } from 'react';

export const CancelableFetch = (controller) => {
  useEffect(() => {
    return () => controller.abort();
  }, [controller]);
};
