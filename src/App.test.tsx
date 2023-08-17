import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

const MockAppComponent = () => (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

it("should render list movies component on / route", () => {
  render(<MockAppComponent />);

  const loadingDiv = screen.getByTestId("list-movies-loading");
  expect(loadingDiv).toBeInTheDocument();
});

it("should render list movies component on /search screen", () => {
  render(<MockAppComponent />);

  window.history.pushState({}, "", "/search?query=ironman");

  const loadingDiv = screen.getByTestId("list-movies-loading");
  expect(loadingDiv).toBeInTheDocument();
});
