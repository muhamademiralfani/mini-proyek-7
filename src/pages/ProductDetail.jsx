import React, { useEffect } from 'react';
import './styles/productDetail.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById } from '../redux/async/productsSlice';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams(); // Destructure id from useParams
  const dispatch = useDispatch(); // Use dispatch to fetch product
  const { product } = useSelector((state) => state.products);
  const language = useSelector((state) => state.language.language); // Get language from Redux state

  useEffect(() => {
    dispatch(getProductById(id)); // Fetch product by ID
  }, [dispatch, id]); // Add id to dependency array

  // Function to format the price as Indonesian Rupiah
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, // No decimal places for whole numbers
    }).format(amount);
  };

  return (
    <div className="main-container">
      <div className="detail-container">
        <h1>{language === 'en' ? 'Product Details' : 'Detail Produk'}</h1>
        <table className="detail-table">
          <tbody>
            <tr>
              <td className="detail-label">{language === 'en' ? 'ID:' : 'ID:'}</td>
              <td>{product.id}</td>
            </tr>
            <tr>
              <td className="detail-label">{language === 'en' ? 'Name:' : 'Nama:'}</td>
              <td>{product.name}</td>
            </tr>
            <tr>
              <td className="detail-label">{language === 'en' ? 'Price:' : 'Harga:'}</td>
              <td>{formatCurrency(product.price)}</td>
            </tr>
            <tr>
              <td className="detail-label">{language === 'en' ? 'Stock:' : 'Stok:'}</td>
              <td>{product.stock}</td>
            </tr>
            <tr>
              <td className="detail-label">{language === 'en' ? 'Description:' : 'Deskripsi:'}</td>
              <td>{product.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
