import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Giger } from './apps/giger/giger';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Giger />} />
      </Routes>
    </BrowserRouter>
  );
};