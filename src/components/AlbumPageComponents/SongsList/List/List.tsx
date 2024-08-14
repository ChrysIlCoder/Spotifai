import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./List.scss";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import SongHorizontalCard from "../../../SongHorizontalCard/SongHorizontalCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { changeAlbumOrderSelector } from "../../../../redux/features/changeAlbumOrder/changeAlbumOrderSlice";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSearchParams } from "react-router-dom";
import React from "react";
import { albumsSelector } from "../../../../redux/saga/albums/slice/albumsSlice";

export default function List() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  
  const album = useSelector(albumsSelector.getAlbum)
  const albumOrder = useSelector(changeAlbumOrderSelector.getAlbumOrder);
  
  const tracks = album?.tracks?.items || [];
  const [albumTracks, setAlbumTracks] = useState(tracks)
  
  useEffect(() => {
    const sortSongs = (option: string) => {
      const sortedSongs = [...tracks];
      sortedSongs.sort((a, b) => {
        switch (option) {
          case "custom_order":
            return a.id.localeCompare(b.id);
          case "title":
            return a.name.localeCompare(b.name);
          case "artist":
            return a.artists[0].name.localeCompare(b.artists[0].name);
          case "album":
            return a.name.localeCompare(b.name);
          case "duration":
            return a.duration_ms - b.duration_ms;
          default:
            return 0;
        }
      });
      return sortedSongs;
    };

    if (albumOrder && tracks.length > 0) {
      setAlbumTracks(sortSongs(albumOrder))
    }
  }, [albumOrder, tracks]);

  useEffect(() => {
    setAlbumTracks(
      search
        ? albumTracks.filter((song) => song.name.toLowerCase().includes(search))
        : tracks
    );
  }, [search, tracks]);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setAlbumTracks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="list_container">
      <div className="list_container__header">
        <div className="list_container__header__left_side">
          <span className="list_container__header__left_side__item">#</span>
          <span className="list_container__header__left_side__item">title</span>
        </div>
        <span className="list_container__header__album">album</span>
        <span className="list_container__header__duration">
          <FontAwesomeIcon icon={faClock} />
        </span>
      </div>
      <div>
        <DndContext onDragEnd={onDragEnd}>
          <SortableContext items={albumTracks} strategy={verticalListSortingStrategy}>
            {albumTracks?.map((song, index) => (
              //@ts-ignore
              <SongHorizontalCard key={song.id} index_number={index} {...song} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
