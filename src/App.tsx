import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import PageLayout from "./components/Layouts/PageLayout/PageLayout";
import Footer from "./components/Footer/Footer";
import AlbumPage from "./pages/AlbumPage";
import SearchPage from "./pages/SearchPage";
import ListeningToSidebar from "./components/ListeningToSidebar/ListeningToSidebar";
import { useDispatch, useSelector } from "react-redux";
import { showListeningToSidebarSelector } from "./redux/features/showListeningSidebar/showListeningSidebarSlice";
import {
  authSagaActions,
  authSelector,
} from "./redux/saga/auth/slice/authSlice";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { tracksSelector } from "./redux/saga/tracks/slice/tracksSlice";

export default function App() {
  const show_sidebar = useSelector(
    showListeningToSidebarSelector.getSidebarState
  );
  const auth = useSelector(authSelector.getToken);
  const track = useSelector(tracksSelector.getTrack);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      authSagaActions.sagaGetToken({
        client_id: "1bde56ca8e774bd9864388566858147f",
        client_secret: "f85d93194b83473a8a9c49dfc6bc16bf",
      })
    );
  }, []);

  useEffect(() => {
    if (auth.expires_in)
      setTimeout(() => {
        alert("Token has expired");
        window.location.reload();
      }, auth.expires_in * 1000);
  }, [auth.expires_in]);

  useEffect(() => {
    if (track?.id) document.title = `${track?.name} - Spotifai`;
    else document.title = `Spotifai`;
  }, [track?.id]);

  return auth.access_token ? (
    <BrowserRouter>
      <PageLayout>
        <LeftSidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        {show_sidebar && <ListeningToSidebar />}
        <Footer />
      </PageLayout>
    </BrowserRouter>
  ) : (
    <LoadingScreen message="Authenticating..." />
  );
}
