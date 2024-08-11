import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../src/state/store";
import App from "./App";
let appComponent;

beforeEach(() => {
  appComponent = (
    <Provider store={store}>
      <App />
    </Provider>
  );
});

describe("App component", () => {
  test("should check if the input field handles the keyword input and sets the keyword when the set keyword button is clicked", () => {
    render(appComponent);
    const input = screen.queryByTestId("keywordInputID");
    const setKeywordButton = screen.queryByTestId("setKeywordID");
    expect(store.getState().showKeyword).toBe(false);

    fireEvent.change(input, {
      target: { value: "italian" },
    });

    expect(store.getState().keywordInput).toBe("italian");
    fireEvent.click(setKeywordButton);
    expect(store.getState().keywordInput).toBe("");
    expect(screen.queryByTestId("keywordID").textContent).toContain("italian");
    expect(store.getState().showKeyword).toBe(true);
    expect(store.getState().keyword).toBe("italian");
  });

  test("should check if the input and keyword can be changed from italian to malay", () => {
    render(appComponent);
    expect(store.getState().keyword).toBe("italian");
    const input = screen.queryByTestId("keywordInputID");
    const setKeywordButton = screen.queryByTestId("setKeywordID");

    fireEvent.change(input, {
      target: { value: "malay" },
    });

    expect(store.getState().keywordInput).toBe("malay");
    fireEvent.click(setKeywordButton);
    expect(store.getState().keywordInput).toBe("");
    expect(screen.queryByTestId("keywordID").textContent).toContain("malay");
    expect(store.getState().keyword).toBe("malay");
  });

  test("should check if the current input is egg and if egg can get added to the stores ingredients array", () => {
    render(appComponent);
    const input = screen.queryByTestId("ingredientInputID");
    const addIngredientButton = screen.queryByTestId("addIngredientID");

    fireEvent.change(input, {
      target: { value: "egg" },
    });

    expect(store.getState().ingredient).toBe("egg");
    fireEvent.click(addIngredientButton);
    expect(store.getState().ingredients[0]).toBe("egg");
    expect(screen.getByTestId("ingredientsListID").textContent).toContain(
      "egg"
    );
    expect(store.getState().ingredient).toBe("");
  });

  test("should check if another ingredient gets added to the store array and ingredients list on the browser when the add button is clicked", () => {
    render(appComponent);
    const input = screen.queryByTestId("ingredientInputID");
    const addIngredientButton = screen.queryByTestId("addIngredientID");

    fireEvent.change(input, {
      target: { value: "mayo" },
    });

    expect(store.getState().ingredient).toBe("mayo");
    fireEvent.click(addIngredientButton);
    expect(store.getState().ingredients[1]).toBe("mayo");
    expect(screen.getByTestId("ingredientsListID").textContent).toContain(
      "mayo"
    );
    expect(store.getState().ingredient).toBe("");
  });

  test("should check if the error 'Ingredient already added' gets displayed and error updates in the store", () => {
    render(appComponent);
    const input = screen.queryByTestId("ingredientInputID");
    const addIngredientButton = screen.queryByTestId("addIngredientID");

    fireEvent.change(input, {
      target: { value: "maeyo" },
    });

    expect(store.getState().ingredient).toBe("maeyo");
    fireEvent.click(addIngredientButton);
    expect(store.getState().error).toBe("Ingredient already added");
    expect(screen.getByTestId("errorID").textContent).toContain(
      "Ingredient already added"
    );
  });

  test("should check if the ingredient egg gets removed from the ingredients list when the trash button is clicked", () => {
    render(appComponent);
    const removeButton = screen.getAllByTestId("removeIngredientID")[0];
    fireEvent.click(removeButton);
    expect(screen.getByTestId("ingredientsListID").textContent).not.toContain(
      "egg"
    );
    expect(store.getState().ingredients[0]).toBe("mayo");
  });
});
