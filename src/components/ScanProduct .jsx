import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { useDispatch, useSelector } from 'react-redux';

const ScanProduct = () => {
  const [data, setData] = useState('Not Found');
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);

  const handleScan = (err, result) => {
    if (result) {
      const scannedId = result.text;
      setData(scannedId);

      // Check if the scanned ID exists in the products
      const product = products.find((p) => p.id === scannedId);
      if (product) {
        // Redirect to the product detail page
        navigate(`/products/${scannedId}`);
      } else {
        alert('Product not found!');
      }
    } else {
      setData('Not Found');
    }
  };

  return (
    <div className="main-container">
      <div className="scan-container">
        <h1>Scan Product QR Code or Barcode</h1>
        <div className="camera-view">
          <BarcodeScannerComponent
            style={{ width: '100%', height: '100%' }}
            delay={1000}
            onUpdate={handleScan}
          />
        </div>
        <p>Scanned Data: {data}</p>
      </div>
    </div>
  );
};

export default ScanProduct;
