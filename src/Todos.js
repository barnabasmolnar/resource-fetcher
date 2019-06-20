import React from "react";
import { fetchTodos, useFetchAndSetData } from "./utils";
import { renderBasedOnViewState } from "./renderUtils";

const Todos = ({ numToFetch }) => {
  const [todos, viewState] = useFetchAndSetData(fetchTodos, numToFetch, []);

  return renderBasedOnViewState(
    viewState,
    <ul>
      {todos.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
};

export default Todos;
