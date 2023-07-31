import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import SignUpPage from "./views/SignUpPage";
import Navbar from "./components/Layout";
import GalleryPage from "./views/GalleryPage";

import { useMemo } from "react";

import { themeSettings } from "./theme";
import Favourites from "./views/FavouritesPage";
import AlbumPage from "./views/AlbumPage";
import AlbumViewPage from "./views/AlbumViewPage";

function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route path="/" element={<Navigate to="/gallery" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route element={<Navbar />}>
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/likes" element={<Favourites />} />
              <Route path="/albums" element={<AlbumPage />} />
              <Route path="albums/:id" element={<AlbumViewPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
