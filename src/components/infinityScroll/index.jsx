import { useEffect, useState } from "react";
import { CardComponent } from "../card";
import "./style.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { getDiscoverMovies } from "../../services/services";

export const InfinityScroll = () => {
  const [infoPage, setinfoPage] = useState(1);
  const [movies, setMovies] = useState([]);

  const nextList = () => {
    getDiscoverMovies(infoPage).then((res) => {
      const newData = movies.concat(res.data.results);
      setMovies(newData);
      setinfoPage(infoPage + 1);
    });
  };

  useEffect(() => {
    nextList();
  }, [infoPage]);

  return (
    <InfiniteScroll
      className="cards"
      dataLength={20}
      next={nextList}
      hasMore={true}
      scrollableTarget="infiniteScroll"
      id="infiniteScroll"
    >
      {movies.map((item, i) => (
        <CardComponent movie={item} key={i} />
      ))}
    </InfiniteScroll>
  );
};
