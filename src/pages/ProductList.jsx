import React, { useEffect, useState } from 'react';
import './styles/productlist.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchProducts,
  getProductById,
  currentProducts,
  deleteProduct,
} from '../redux/async/productsSlice';
import Loading from '../components/Loading';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const language = useSelector((state) => state.language.language); // Get language from Redux state
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, // No decimal places for whole numbers
    }).format(amount);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <Loading />;
  }

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="main-container">
      <h1>{language === 'en' ? 'Product List' : 'Daftar Produk'}</h1>
      <div className="header-table">
        <div className="header-button">
          <input
            type="text"
            placeholder={
              language === 'en'
                ? 'Search by name...'
                : 'Cari berdasarkan nama...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Link to={'/add'} className="btn-add">
            {language === 'en' ? 'Add Product' : 'Tambah Produk'}
          </Link>
        </div>
        <div className="scan-button-container">
          <Link to={'/scan'} className="scan-button">
            <span className="material-symbols-outlined">barcode_scanner</span>
          </Link>
        </div>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>{language === 'en' ? 'Name' : 'Nama'}</th>
              <th>{language === 'en' ? 'Price' : 'Harga'}</th>
              <th>{language === 'en' ? 'Stock' : 'Stok'}</th>
              <th>{language === 'en' ? 'Action' : 'Aksi'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>{product.stock}</td>
                <td className="action-cell">
                  <Link
                    to={`/edit/${product.id}`}
                    onClick={() => {
                      dispatch(currentProducts(product));
                    }}
                    className="btn-action edit"
                  >
                    {language === 'en' ? 'Edit' : 'Ubah'}
                  </Link>
                  <Link
                    to={`/products/${product.id}`}
                    onClick={() => {
                      dispatch(getProductById(product.id));
                    }}
                    className="btn-action detail"
                  >
                    {language === 'en' ? 'Detail' : 'Detail'}
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteProduct(product.id));
                    }}
                    className="btn-action delete"
                  >
                    {language === 'en' ? 'Delete' : 'Hapus'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
