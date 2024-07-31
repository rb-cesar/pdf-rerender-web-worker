import { expose } from 'comlink';
import { PDFProps } from '../PDF';
import './workerShim';

let log = console.log;

const renderPDFWithWorker = async (props: PDFProps) => {
  console.log({ log: 'Test' });
  try {
    const { renderPDF } = await import('../PDF');
    // @ts-ignore
    const url = URL.createObjectURL(await renderPDF(props));
    log({ url });
    return url;
  } catch (error: any) {
    log(error);
    throw error;
  }
};

const onProgress = (cb: typeof console.log) => (log = cb);

expose({ renderPDFInWorker: renderPDFWithWorker, onProgress });

export type WorkerType = {
  renderPDFInWorker: typeof renderPDFWithWorker;
  onProgress: typeof onProgress;
};
