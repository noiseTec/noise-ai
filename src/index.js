import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { store } from './redux/store';
import Home from './routes/Home';
import Interactive from './routes/Interactive';
import Gallery from './routes/Gallery';
import About from './routes/About';

const AnimatedRoute = () => {
  const location = useLocation();

  const getPathKey = (path, level = 1) => {
    return path.split("/").splice(1, level).join("/");
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={getPathKey(location.pathname)}>
        <Route element={<App />} path="/">
          <Route index element={<Home />} />
          <Route element={<Interactive />} path="interactive/*" />
          <Route element={<Gallery />} path="gallery" />
          <Route element={<About />} path="about" />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AnimatedRoute />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
