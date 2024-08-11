import SearchBar from "./SearchBar";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
let searchBarComponent;

beforeEach(() => {
  searchBarComponent = (
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );
});

describe("SearchBar component", () => {
  test("should check if the keyword and ingredient input fields are visible", () => {
    render(searchBarComponent);
    expect(screen.queryByTestId("keywordID")).toBeVisible();
    expect(screen.queryByTestId("ingredientID")).toBeVisible();
  });
  test("should check if the buttons set keyword and add ingredient are visible", () => {
    render(searchBarComponent);
    expect(screen.getByText("Set keyword")).toBeVisible();
    expect(screen.getByText("Add ingredient")).toBeVisible();
  });
  test("should check if fetch is called when the search recipe button is clicked", () => {
    const fetchSpy = jest.spyOn(global, "fetch");
    render(searchBarComponent);
    const input = screen.queryByTestId("ingredientInputID");
    const searchRecipeButton = screen.queryByTestId("submitID");

    fireEvent.change(input, {
      target: { value: "chicken" },
    });

    fireEvent.click(searchRecipeButton);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
