import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBrand from './pages/CreateBrand';
import ViewBrands from './pages/ViewBrands';

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-brand" element={<CreateBrand />} />
      <Route path="/view-brands" element={<ViewBrands />} />
    </Routes>
  );
};

export default RouterConfig;
