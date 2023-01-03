import { Route, Routes } from 'react-router-dom';
import Main from './page/Main';

const Router = () => {
  return (
    <Routes>
      <Route index element={<Main />} />
      {/* <Route path="/signin" element={<Signin />} /> */}
    </Routes>
  );
};

export default Router;
