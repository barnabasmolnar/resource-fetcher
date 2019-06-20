import React from "react";
import { fetchPosts, useFetchAndSetData } from "./utils";
import { renderBasedOnViewState } from "./renderUtils";

const Posts = ({ numToFetch }) => {
  const [posts, viewState] = useFetchAndSetData(fetchPosts, numToFetch, []);

  return renderBasedOnViewState(
    viewState,
    <ul>
      {posts.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
};

export default Posts;
