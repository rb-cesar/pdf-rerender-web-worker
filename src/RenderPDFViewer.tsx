import { ComponentProps, FC, useDeferredValue } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { useRenderPDF } from './hook/useRenderPDF';

const RenderPDFViewer: FC<
  Omit<ComponentProps<typeof PDFViewer>, 'children'> & {
    title: string;
  }
> = ({ style, className, title, innerRef, showToolbar = true, ...props }) => {
  const text = useDeferredValue(title);

  const { error, loading, url } = useRenderPDF({
    title: text,
  });

  const src = url ? `${url}#toolbar=${showToolbar ? 1 : 0}` : null;

  console.log({ src, error, loading });

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    console.log(error);
    return (
      <div className={className} style={style as any}>
        {JSON.stringify(error)}
      </div>
    );
  }

  return (
    <iframe
      src={src!}
      ref={innerRef}
      style={style as any}
      className={className}
      {...props}
    />
  );
};

export default RenderPDFViewer;
