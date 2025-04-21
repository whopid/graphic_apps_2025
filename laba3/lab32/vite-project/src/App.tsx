import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import initializeI18n from './init';

const i18n = initializeI18n();

const App = () => {
  const { t, i18n } = useTranslation();
  const [count, setCount] = useState(0);
  const currentLanguage = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  const getClickText = () => {
    return t('counter.clicks', { 
      count,
      postProcess: 'pluralization'
    });
  };

  return (
    <div className="d-flex flex-column align-items-center p-4">
      <div className="btn-group" role="group">
        <button
          type="button"
          className={`btn mb-3 ${currentLanguage === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => changeLanguage('en')}
          data-testid="en"
        >
          {t('language.en')}
        </button>
        <button
          type="button"
          className={`btn mb-3 ${currentLanguage === 'ru' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => changeLanguage('ru')}
          data-testid="ru"
        >
          {t('language.ru')}
        </button>
      </div>

      <button
        type="button"
        className="btn btn-info mb-3 align-self-center"
        onClick={incrementCount}
        data-testid="counter"
      >
        {getClickText()}
      </button>

      <button
        type="button"
        className="btn btn-warning"
        onClick={resetCount}
        data-testid="reset"
      >
        {t('reset')}
      </button>
    </div>
  );
};

export default App;