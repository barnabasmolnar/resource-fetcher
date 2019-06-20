import { useState, useEffect } from "react";
import axios from "axios";

// View States
export const LOADING = "LOADING";
export const SUCCESS = "SUCCESS";

const API_URL = "https://jsonplaceholder.typicode.com/";

const getAPIResponse = (endpoint, error) =>
  axios
    .get(`${API_URL}${endpoint}`)
    .then(({ data }) => data)
    .catch(() => Promise.reject(error));

export const fetchTodos = numToFetch =>
  getAPIResponse("todos", "Cannot fetch todos.").then(data =>
    data.slice(0, numToFetch)
  );
export const fetchPosts = numToFetch =>
  getAPIResponse("posts", "Cannot fetch posts.").then(data =>
    data.slice(0, numToFetch)
  );

// Custom hook
export const useFetchAndSetData = (fetchData, numToFetch, initialValue) => {
  const [data, setData] = useState(initialValue);
  const [viewState, setViewState] = useState(LOADING);

  useEffect(() => {
    const fn = async () => {
      try {
        const fetchedData = await fetchData(numToFetch);
        setData(fetchedData);
        setViewState(SUCCESS);
      } catch (error) {
        setViewState(error);
      }
    };
    fn();
  }, []);

  return [data, viewState];
};
