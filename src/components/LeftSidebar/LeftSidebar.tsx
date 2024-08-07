import NavButton from "../Buttons/NavButton/NavButton";
import "./LeftSidebar.scss";

//@ts-ignore
import home_icon_fill from "../../assets/icons/Home_Fill_S.svg";
//@ts-ignore
import search_icon_fill from "../../assets/icons/Search_Fill_S.svg";
//@ts-ignore
import home_icon from "../../assets/icons/Home_S.svg";
//@ts-ignore
import search_icon from "../../assets/icons/Search_S.svg";
import AlbumsVerticalList from "../AlbumsVerticalList/AlbumsVerticalList";
import { useNavigate } from "react-router-dom";
import { CSSProperties, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { albumsSagaActions, albumsSelector } from "../../redux/saga/albums/slice/albumsSlice";
import { authSelector } from "../../redux/saga/auth/slice/authSlice";

export default function LeftSidebar() {
  const [collapse, setCollapse] = useState(false);
  const navigate = useNavigate();

  const auth = useSelector(authSelector.getToken);
  const featured_albums = useSelector(albumsSelector.getFeaturedAlbums);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      albumsSagaActions.sagaGetFeaturedAlbums({
        token: auth.access_token,
        limit: 50
      })
    );
  }, []);

  const collapsed_styles: CSSProperties = {
    width: "100%",
    paddingInline: 10
  };

  return (
    <div
      className="sidebar_container"
      style={collapse ? collapsed_styles : undefined}
    >
      <FontAwesomeIcon
        title="Collapse"
        size="xl"
        onClick={() => setCollapse((prev) => !prev)}
        className="sidebar_container__collapse"
        style={{ transform: collapse ? "scaleX(100%)" : "scaleX(-100%)" }}
        icon={faArrowRightFromBracket}
      />
      <NavButton
        active_icon={home_icon_fill}
        icon={home_icon}
        name="Home"
        onClick={() => navigate("/")}
        active={location.pathname === "/"}
        collapse={collapse}
      />
      <NavButton
        active_icon={search_icon_fill}
        icon={search_icon}
        name="Search"
        onClick={() => navigate("/search")}
        active={location.pathname === "/search"}
        collapse={collapse}
      />
      <hr className="sidebar_container__hr" />
      {!collapse && (
        <AlbumsVerticalList {...featured_albums} />
      )}
    </div>
  );
}
