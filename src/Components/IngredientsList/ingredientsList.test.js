import IngredientsList from "./IngredientsList";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
let ingredientsListComponent;

beforeEach(() => {
  ingredientsListComponent = (
    <Provider store={store}>
      <IngredientsList />
    </Provider>
  );
});

describe("IngredientsList component", () => {
  test("should check if the ingredients list is not visible and the redux store ingredients is an empty array", () => {
    render(ingredientsListComponent);
    expect(screen.queryByTestId("ingredientsListID").textContent).toBe("");
    expect(store.getState().ingredients.length).toBe(0);
  });
});
