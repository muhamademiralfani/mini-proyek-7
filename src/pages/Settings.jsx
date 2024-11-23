import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/slice/languageSlice'; // Adjust the path as necessary
import { toggleDarkMode } from '../redux/slice/darkModeSlice'; // Adjust the path as necessary
import './styles/settings.css';

const Settings = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language); // Get language from Redux state
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode); // Get dark mode status from Redux state

  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value)); // Dispatch action to set language
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode()); // Dispatch action to toggle dark mode
    document.body.classList.toggle('dark-mode', !isDarkMode); // Update body class for dark mode
    document.body.classList.toggle('light-mode', isDarkMode); // Update body class for light mode
  };

  return (
    <div className="main-container">
      <div className="settings-container">
        <h1>{language === 'en' ? 'Settings' : 'Pengaturan'}</h1>
        <div className="settings-item">
          <label htmlFor="language">
            {language === 'en' ? 'Language' : 'Pilih Bahasa'}
          </label>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="id">Indonesian</option> {/* Added Indonesian option */}
          </select>
        </div>
        <div className="settings-item">
          <label htmlFor="darkMode">
            {language === 'en' ? 'Dark Mode' : 'Mode Gelap'}
          </label>
          <div className="toggle-container">
            <label className="toggle-switch">
              <input
                type="checkbox"
                id="darkMode"
                checked={isDarkMode}
                onChange={handleToggleDarkMode}
              />
              <span className="slider"></span>
            </label>
            <span className="toggle-label">{isDarkMode ? 'On' : 'Off'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
