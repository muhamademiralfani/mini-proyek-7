import React, { useEffect, useState } from 'react';
import './styles/productlog.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogs } from '../redux/async/logSlice'; // Assuming you have a logSlice for fetching logs
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import Loading from '../components/Loading';

const ProductLog = () => {
  const dispatch = useDispatch();
  const { logs, loading, error } = useSelector((state) => state.logs);
  const language = useSelector((state) => state.language.language); // Get language from Redux state

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const [showScanner, setShowScanner] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  useEffect(() => {
    const updatedLogs = logs.filter((log) => {
      const matchesNote = log.note
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = filterType ? log.type === filterType : true;
      const matchesDate = filterDate ? log.date === filterDate : true;
      return matchesNote && matchesType && matchesDate;
    });
    setFilteredLogs(updatedLogs);
  }, [searchTerm, logs, filterType, filterDate]);

  const handleScan = (err, result) => {
    if (result) {
      setShowScanner(false);
      dispatch(fetchLogs(`logs?product_id=${result.text}`));
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      setFilterType(value);
    } else if (name === 'date') {
      setFilterDate(value);
    }
  };

  const toggleScanner = () => {
    setShowScanner((prev) => !prev); // Toggle scanner visibility
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="main-container">
      <h1>{language === 'en' ? 'Log List' : 'Daftar Log'}</h1>
      <div className="header-table">
        <div className="scan-button-container">
          <input
            type="text"
            placeholder={
              language === 'en'
                ? 'Search by note...'
                : 'Cari berdasarkan catatan...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={toggleScanner} className="btn-scan">
            <span className="material-symbols-outlined">barcode_scanner</span>
          </button>
        </div>

        <select
          name="type"
          value={filterType}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">
            {language === 'en' ? 'All Types' : 'Semua Tipe'}
          </option>
          <option value="stock_in">
            {language === 'en' ? 'Stock In' : 'Stok Masuk'}
          </option>
          <option value="stock_out">
            {language === 'en' ? 'Stock Out' : 'Stok Keluar'}
          </option>
        </select>
        <input
          type="date"
          name="date"
          value={filterDate}
          onChange={handleFilterChange}
          className="filter-date"
        />
      </div>
      {showScanner && (
        <div className="scanner-container">
          <BarcodeScannerComponent
            style={{ width: '100%', height: '100%' }}
            delay={1000}
            height={500}
            onUpdate={handleScan}
          />
        </div>
      )}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>{language === 'en' ? 'Product ID' : 'ID Produk'}</th>
              <th>{language === 'en' ? 'Note' : 'Catatan'}</th>
              <th>{language === 'en' ? 'Date' : 'Tanggal'}</th>
              <th>{language === 'en' ? 'Type' : 'Tipe'}</th>
              <th>{language === 'en' ? 'Quantity' : 'Jumlah'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.product_id}</td>
                <td>{log.note}</td>
                <td>{log.date}</td>
                <td>{log.type}</td>
                <td>{log.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductLog;
