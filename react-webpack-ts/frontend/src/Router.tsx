import { Route, Routes } from 'react-router-dom';
import Index from './page/Index';

const Router = () => {
  return (
    <Routes>
      <Route index element={<Index />} />
      {/* <Route path="/signin" element={<Signin />} /> */}
    </Routes>
  );
};

export default Router;
