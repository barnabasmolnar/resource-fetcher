import { LOADING, SUCCESS } from "./utils";

export const renderBasedOnViewState = (viewState, component) => {
  switch (viewState) {
    case LOADING:
      return "Loading, please wait...";
    case SUCCESS:
      return component;
    default:
      return viewState || "Unknown Error. Something happened.";
  }
};
