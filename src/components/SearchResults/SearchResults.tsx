import React from "react";
import "./SearchResults.scss";
import AlbumVerticalCard from "../AlbumVerticalCard/AlbumVerticalCard";
import Section from "../Section/Section";
import { useSelector } from "react-redux";
import { searchSelector } from "../../redux/saga/search/slice/searchSlice";
import TrackHorizontalCard from "../TrackHorizontalCard/TrackHorizontalCard";
import ArtistVerticalCard from "../ArtistVerticalCard/ArtistVerticalCard";

export default function SearchResults() {
  const search_results = useSelector(searchSelector.getSearchResults);

  return (
    <div className="search_results_container">
      <Section title={Object.keys(search_results)[2].toString()}>
        <div className="search_results_container__tracks">
          {search_results.tracks.items.slice(0, 4).map((track) => (
            <TrackHorizontalCard
              artists={track.artists.map((artist) => artist.name)}
              cover={track.album.images[0].url}
              duration_ms={track.duration_ms}
              name={track.name}
              album={track.album}
              key={track.id}
            />
          ))}
        </div>
      </Section>
      <Section title={Object.keys(search_results)[1].toString()}>
        <div className="search_results_container__artists">
          {search_results.artists.items.map((artist) => (
            <ArtistVerticalCard
              cover={artist?.images?.[0]?.url}
              name={artist.name}
              id={artist?.id}
              key={artist.id}
            />
          ))}
        </div>
      </Section>
      <Section title={Object.keys(search_results)[0].toString()}>
        <div className="search_results_container__albums">
          {search_results.albums.items.map((album) => (
            <AlbumVerticalCard
              artists={album.artists.map((artist) => artist.name)}
              cover={album.images[0].url}
              id={album.id}
              name={album.name}
              key={album.id}
            />
          ))}
        </div>
      </Section>
      <Section title={Object.keys(search_results)[3].toString()}>
        <div className="search_results_container__playlists">
          {search_results.playlists.items.map((playlist) => (
            <AlbumVerticalCard
              artists={[`By ${playlist.owner.display_name}`]}
              cover={playlist.images[0].url}
              id={playlist.id}
              name={playlist.name}
              key={playlist.id}
              playlist
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
