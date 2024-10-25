import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';
import QRCode from 'qrcode';  
import { Card } from 'primereact/card';

function App() {

  const [query, setQuery] = useState('')
  const [qrUrl, setQrUrl] = useState('')
const generateQr = async() =>{
  try {
      const dataUrl = await QRCode.toDataURL(query)
      setQrUrl(dataUrl)
  } catch (e) {
    console.error(e);
    
  }
}

const downloadQr = () => {
  try {
    const link = document.createElement('a')
    link.href = qrUrl
    link.download = encodeURIComponent('qr code')
    link.style.display= 'none'
    link.click()

    document.body.removeChild(link)
  } catch (e) {
    alert('Failed to download')
  }
}

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <InputTextarea autoResize value={query} onChange={(e) => setQuery(e.target.value)} rows={5} cols={30} />
      <br/> <br/>
      <Button label="Generate QR Code" onClick={generateQr}/>
    {
      qrUrl ? (
        <>
        <Card title="QR Code" style={{width: 'fit-content', margin: '10vh auto', minWidth:'20vw'}}>
          <img src={qrUrl} alt='qrcode' width={300}/>
          <br/>
          <Button label='Download' onClick={downloadQr}/>
</Card>
        </>
      ) : ''
    }
    </div>
  );
}

export default App;
