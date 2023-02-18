import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBrand from './pages/CreateBrand';
import ViewBrands from './pages/ViewBrands';
import ViewMerchants from './pages/ViewMerchants';

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-brand" element={<CreateBrand />} />
      <Route path="/view-brands" element={<ViewBrands />} />
      <Route path="/view-merchants" element={<ViewMerchants />} />
    </Routes>
  );
};

export default RouterConfig;
