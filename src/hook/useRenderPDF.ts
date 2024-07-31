import { useAsync } from 'react-use';

import { proxy, wrap } from 'comlink';
import type { WorkerType } from '../worker/pdfWorker';
import Worker from '../worker/pdfWorker?worker';

export const pdfWorker = wrap<WorkerType>(new Worker());

pdfWorker.onProgress(proxy((info: any) => console.log(info)));

export const useRenderPDF = ({
  title,
}: Parameters<WorkerType['renderPDFInWorker']>[0]) => {
  const {
    value: url,
    loading,
    error,
  } = useAsync(async () => {
    console.log(pdfWorker.renderPDFInWorker);
    return pdfWorker.renderPDFInWorker({ title });
  }, [title]);

  // useEffect(() => (url ? () => URL.revokeObjectURL(url) : undefined), [url]);

  return { url, loading, error };
};
