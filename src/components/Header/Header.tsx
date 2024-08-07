import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.scss";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function Header() {
  return (
    <div className="header_container">
      <button
        className="header_container__nav_button"
        onClick={() => history.back()}
      >
        <FontAwesomeIcon size="xl" icon={faChevronLeft} />
      </button>
      <button
        className="header_container__nav_button"
        onClick={() => history.forward()}
      >
        <FontAwesomeIcon size="xl" icon={faChevronRight} />
      </button>
    </div>
  );
}
