import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import HomePage from './Pages/HomePage';
import AnalysisPage from './Pages/AnalysisPage.tsx';
import AboutPage from './Pages/AboutPage';
import NewsomPage from './Pages/NewsomPage.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<HomePage />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="analysis/GavinNewsom" element={<NewsomPage />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;