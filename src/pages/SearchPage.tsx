import React, { useEffect } from "react";
import SearchPageLayout from "../components/Layouts/SearchPageLayout/SearchPageLayout";
import GenresGrid from "../components/SearchPageComponents/GenresGrid/GenresGrid";
import SearchHeader from "../components/SearchPageComponents/SearchHeader/SearchHeader";
import Section from "../components/Section/Section";
import { useDispatch, useSelector } from "react-redux";
import {
  categoriesSagaActions,
  categoriesSelector
} from "../redux/saga/categories/slice/categoriesSlice";
import { authSelector } from "../redux/saga/auth/slice/authSlice";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { searchSelector } from "../redux/saga/search/slice/searchSlice";
import { searchActions } from "../redux/saga/search/slice";
import SearchResults from "../components/SearchResults/SearchResults";

export default function SearchPage() {
  const loading = useSelector(categoriesSelector.getIsLoading);
  const search_results = useSelector(searchSelector.getSearchResults);
  const auth = useSelector(authSelector.getToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchActions.reset());
    dispatch(
      categoriesSagaActions.sagaGetSeveralCategories({
        token: auth.access_token
      })
    );
  }, []);

  return !loading ? (
    <SearchPageLayout>
      <SearchHeader />
      {Object.keys(search_results).length > 0 && <SearchResults />}
      <Section title="Browse All">
        <GenresGrid />
      </Section>
    </SearchPageLayout>
  ) : (
    <LoadingScreen />
  );
}
