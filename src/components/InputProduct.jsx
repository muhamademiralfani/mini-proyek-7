import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../redux/async/productsSlice';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { useNavigate } from 'react-router-dom';
import './styles/inputproduct.css';
import Loading from './Loading';

const InputProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState('Not Found');
  const [existingProduct, setExistingProduct] = useState(false);
  const { product, loading, isEdit, products } = useSelector(
    (state) => state.products,
  );
  const language = useSelector((state) => state.language.language); // Get language from Redux state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    stock: '',
    description: '',
  });

  useEffect(() => {
    if (isEdit) {
      setFormData(product);
    }
  }, [isEdit, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for duplicate ID if adding a new product
    if (!isEdit) {
      const existingProduct = products.find((p) => p.id === formData.id);
      if (existingProduct) {
        setExistingProduct(true);
        return;
      }
    }

    // Dispatch the appropriate action
    if (isEdit) {
      dispatch(updateProduct(formData));
    } else {
      dispatch(addProduct(formData));
    }

    navigate('/products'); // Navigate after saving
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div className="main-container">
      <div className="container">
        <h1>
          {isEdit
            ? language === 'en'
              ? 'Edit Product'
              : 'Edit Produk'
            : language === 'en'
              ? 'Add New Product'
              : 'Tambah Produk'}
        </h1>
        <form onSubmit={handleSubmit} id="product-form">
          <div className="form-group">
            <label htmlFor="id">
              {language === 'en' ? 'Product ID' : 'ID Produk'}
            </label>
            <input
              type="text"
              onChange={handleChange}
              id="id"
              name="id"
              required
              disabled={loading || isEdit}
              value={formData.id}
              placeholder={
                language === 'en'
                  ? 'Enter product ID manually'
                  : 'Masukkan ID produk secara manual'
              }
            />
            {existingProduct && (
              <p className="error-message">
                {language === 'en'
                  ? 'Product ID already exists!'
                  : 'ID Produk sudah ada!'}
              </p>
            )}
            <div
              id="qr-code-camera"
              style={isEdit ? { display: 'none' } : { display: 'block' }}
            >
              <p>
                {language === 'en'
                  ? 'Or scan QR Code:'
                  : 'Atau pindai Kode QR:'}
              </p>
              <div className="camera-view">
                <BarcodeScannerComponent
                  style={{ width: '100%', height: '100%' }}
                  delay={1000}
                  onUpdate={(err, result) => {
                    if (result) {
                      const scannedData = result.text;
                      setData(scannedData);
                      setFormData((prevData) => ({
                        ...prevData,
                        id: scannedData, // Update the ID with scanned data
                      }));
                    } else {
                      setData('Not Found');
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">
              {language === 'en' ? 'Product Name' : 'Nama Produk'}
            </label>
            <input
              type="text"
              id="name"
              onChange={handleChange}
              name="name"
              disabled={loading}
              value={formData.name}
              placeholder={
                language === 'en'
                  ? 'Enter product name'
                  : 'Masukkan nama produk'
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">
              {language === 'en' ? 'Price' : 'Harga'}
            </label>
            <input
              type="number"
              id="price"
              onChange={handleChange}
              name="price"
              value={formData.price}
              disabled={loading}
              placeholder={
                language === 'en'
                  ? 'Enter product price'
                  : 'Masukkan harga produk'
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">
              {language === 'en' ? 'Stock' : 'Stok'}
            </label>
            <input
              type="number"
              disabled={loading}
              id="stock"
              value={formData.stock}
              onChange={handleChange}
              name="stock"
              placeholder={
                language === 'en'
                  ? 'Enter product stock'
                  : 'Masukkan stok produk'
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">
              {language === 'en' ? 'Description' : 'Deskripsi'}
            </label>
            <input
              type="text"
              disabled={loading}
              id="description"
              value={formData.description}
              onChange={handleChange}
              name="description"
              placeholder={
                language === 'en'
                  ? 'Enter product description'
                  : 'Masukkan deskripsi produk'
              }
            />
          </div>
          <button type="submit" className="btn-submit">
            {language === 'en' ? 'Save Product' : 'Simpan Produk'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputProduct;
