import Recipe from "./Recipe";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
let recipeComponent;

beforeEach(() => {
  recipeComponent = (
    <Provider store={store}>
      <Recipe name={""} ingredients={""} image={""} />
    </Provider>
  );
});

describe("Recipe component", () => {
  test("should display an empty string if there are no recipes", () => {
    render(recipeComponent);
    expect(screen.queryByTestId("recipeID").textContent).toContain("");
  });
});
