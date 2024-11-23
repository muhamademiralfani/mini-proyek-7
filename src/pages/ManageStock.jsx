import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { useDispatch, useSelector } from 'react-redux';
import './styles/manageStock.css';
import {
  getProductById,
  updateStockProduct,
} from '../redux/async/productsSlice';
import { addLog } from '../redux/async/logSlice';

const ManageStock = () => {
  const [data, setData] = useState('Not Found');
  const [productName, setProductName] = useState('');
  const [stock, setStock] = useState('');
  const [isStockValid, setIsStockValid] = useState(true); // State for stock validation

  const [noteForm, setNoteForm] = useState({
    product_id: '',
    note: '',
    date: '',
    type: 'stock_in',
    quantity: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { logs } = useSelector((state) => state.logs);
  const language = useSelector((state) => state.language.language); // Get language from Redux state

  const handleScan = (err, result) => {
    if (result) {
      const scannedId = result.text;

      // Find the product by ID
      const product = products.find((product) => product.id === scannedId);

      if (product) {
        // If product is found, set the product name and update noteForm
        setProductName(product.name);
        setNoteForm((prev) => ({
          ...prev,
          product_id: scannedId,
          quantity: '',
          type: 'stock_in',
          note: '',
          date: new Date().toISOString().split('T')[0], // Set current date
        }));
      } else {
        // If product is not found, show an alert
        alert(language === 'en' ? 'Data not found!' : 'Data tidak ditemukan!');
        setProductName(''); // Reset product name
        setData('Not Found'); // Reset scanned data
      }
    } else {
      setData('Not Found');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Update stock state based on quantity input
    if (name === 'quantity') {
      setStock(value);
      // Validate stock quantity
      if (value < 0) {
        setIsStockValid(false);
      } else {
        setIsStockValid(true);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate stock before dispatching actions
    if (stock < 0) {
      alert(language === 'en' ? 'Stock quantity cannot be less than 0!' : 'Jumlah stok tidak boleh kurang dari 0!');
      return;
    }

    // Dispatch the update product action
    dispatch(updateStockProduct({ id: noteForm.product_id, stock: stock }));
    dispatch(getProductById(noteForm.product_id));
    dispatch(addLog(noteForm));
    navigate(`/products`);
  };

  return (
    <div className="main-container">
      <div className="manage-stock-container">
        <h1>{language === 'en' ? 'Manage Stock' : 'Kelola Stok'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">{language === 'en' ? 'Product Name:' : 'Nama Produk:'}</label>
            <input type="text" id="productName" value={productName} readOnly />
          </div>

          <div className="form-group">
            <label>{language === 'en' ? 'Scan Product QR Code or Barcode:' : 'Pindai Kode QR atau Barcode Produk:'}</label>
            <div className="camera-view">
              <BarcodeScannerComponent
                style={{ width: '100%', height: '100%' }}
                delay={1000}
                onUpdate={handleScan}
              />
            </div>
            <p>{language === 'en' ? 'Scanned Data:' : 'Data yang Dipindai:'} {data}</p>
          </div>
          <div className="form-group">
            <label htmlFor="stockQuantity">{language === 'en' ? 'Stock Quantity:' : 'Jumlah Stok:'}</label>
            <input
              type="number"
              id="stockQuantity"
              name="quantity"
              value={noteForm.quantity}
              onChange={handleChange}
              required
              placeholder={language === 'en' ? 'Enter stock quantity' : 'Masukkan jumlah stok'}
              className={!isStockValid ? 'invalid' : ''} // Add invalid class if stock is not valid
            />
            {!isStockValid && (
              <p className="error-message">
                {language === 'en' ? 'Stock quantity cannot be less than 0.' : 'Jumlah stok tidak boleh kurang dari 0.'}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="note">{language === 'en' ? 'Note:' : 'Catatan:'}</label>
            <input
              type="text"
              id="note"
              required
              name="note"
              value={noteForm.note}
              onChange={handleChange}
              placeholder={language === 'en' ? 'Enter a note' : 'Masukkan catatan'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">{language === 'en' ? 'Date:' : 'Tanggal:'}</label>
            <input
              type="date"
              id="date"
              name="date"
              value={noteForm.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>{language === 'en' ? 'Operation:' : 'Operasi:'}</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="type"
                  value="stock_in"
                  checked={noteForm.type === 'stock_in'}
                  onChange={handleChange}
                />
                {language === 'en' ? 'Stock In' : 'Stok Masuk'}
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="type"
                  value="stock_out"
                  checked={noteForm.type === 'stock_out'}
                  onChange={handleChange}
                />
                {language === 'en' ? 'Stock Out' : 'Stok Keluar'}
              </label>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            {language === 'en' ? 'Submit' : 'Kirim'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageStock;
