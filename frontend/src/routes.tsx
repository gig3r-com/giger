import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Giger } from './apps/giger/giger';
import { MainMenu } from './shared/main-menu/main-menu';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Giger />} />
      </Routes>
      <MainMenu />
    </BrowserRouter>
  );
};
