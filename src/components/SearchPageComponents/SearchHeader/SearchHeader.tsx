import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SearchHeader.scss";
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSagaActions } from "../../../redux/saga/search/slice/searchSlice";
import { authSelector } from "../../../redux/saga/auth/slice/authSlice";
import { searchActions } from "../../../redux/saga/search/slice";

export default function SearchHeader() {
  const [query, setQuery] = useState("");
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const auth = useSelector(authSelector.getToken)
  const dispatch = useDispatch()

  useEffect(() => {
    if (timeoutIdRef.current) {
      console.log('waiting')
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current =  setTimeout(() => {
      if (query !== '') {
        console.log('searching')
        dispatch(searchSagaActions.sagaSearch({
          token: auth.access_token,
          q: query,
          types: ['album', 'artist', 'playlist', 'track']
        }))
      } else {
        dispatch(searchActions.reset())
      }
    }, 1000)

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [query])

  return (
    <div className="search_page_header_container">
      <button
        className="search_page_header_container__nav_button"
        onClick={() => history.back()}
      >
        <FontAwesomeIcon size="xl" icon={faChevronLeft} />
      </button>
      <button
        className="search_page_header_container__nav_button"
        onClick={() => history.forward()}
      >
        <FontAwesomeIcon size="xl" icon={faChevronRight} />
      </button>
      <div className="search_page_header_container__search">
        <FontAwesomeIcon color="black" size="xl" icon={faMagnifyingGlass} />
        <input
          className="search_page_header_container__search__input"
          type="search"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Artists, songs, or podcasts"
        />
      </div>
    </div>
  );
}
