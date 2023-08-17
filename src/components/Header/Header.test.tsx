import { screen, render, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
const MockHeader = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Header />
    </Provider>
  </BrowserRouter>
);

it("should render search bar on /search route", () => {
  render(<MockHeader />);
  window.history.pushState({}, "", "/search?query=ironman");

  const searchInput = screen.getByPlaceholderText(/Search/i);

  expect(searchInput).toBeVisible();
});

it("should redirect to search route on typing the query and clicking enter ", () => {
  render(<MockHeader />);

  const searchInput = screen.getByPlaceholderText(/Search/i);
  fireEvent.change(searchInput, { target: { value: "rickc137" } });
  fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

  expect(
    window.location.pathname + window.location.search + window.location.hash
  ).toBe("/search?query=rickc137");
});
