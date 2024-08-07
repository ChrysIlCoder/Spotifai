import { useDispatch, useSelector } from "react-redux";
import GenreCard from "./GenreCard/GenreCard";
import "./GenresGrid.scss";
import React, { useEffect } from "react";
import { categoriesSagaActions, categoriesSelector } from "../../../redux/saga/categories/slice/categoriesSlice";
import { authSelector } from "../../../redux/saga/auth/slice/authSlice";

export default function GenresGrid() {
  const several_categories = useSelector(categoriesSelector.getSeveralCategories)

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="genres_grid_container">
      {several_categories?.categories?.items?.map((genre) => (
        <GenreCard background={getRandomColor()} key={genre.id} {...genre} />
      ))}
    </div>
  );
}
