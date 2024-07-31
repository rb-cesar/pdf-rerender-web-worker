import { useState } from 'react';
import './App.css';
import { saveAs } from 'file-saver';
import RenderPDFViewer from './RenderPDFViewer';

let timeout: any = null;

function App() {
  const [text, setText] = useState('');

  function handleChangeInput(ev: React.ChangeEvent<HTMLInputElement>) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      console.log('Debounced:', text);
      setText(ev.target.value);
    }, 500);
  }

  return (
    <div>
      <input onChange={handleChangeInput} />
      <button
        onClick={async () => {
          const { renderPDF } = await import('./PDF');
          const blob = await renderPDF({ title: text });
          saveAs(blob, 'test.pdf');
        }}
      >
        Download
      </button>
      <RenderPDFViewer
        title={text}
        style={{ backgroundColor: 'grey', width: '500px', height: '760px' }}
      />
    </div>
  );
}

export default App;
