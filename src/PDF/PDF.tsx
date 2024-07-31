import { Document, Page, Text } from '@react-pdf/renderer';
import { FC } from 'react';

export type PDFProps = {
  title: string;
};

export const PDF: FC<PDFProps> = ({ title }) => {
  return (
    <Document title={title} author="dev" subject="test">
      <Page>
        <Text>PDF</Text>
      </Page>
    </Document>
  );
};
