import React from "react";
import { Todos, Posts } from "resource-fetcher";

const App = () => (
  <div>
    <Todos numToFetch={5} />
    <Posts numToFetch={10} />
  </div>
);

export default App;
