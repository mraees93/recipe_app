import RecipesLayout from "./RecipesLayout";
import Recipe from "./Recipe";
import SearchBar from "../SearchBar/SearchBar";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import { setAllRecipes, showRecipes } from "../../state/actions";
let recipesLayoutComponent;

beforeEach(() => {
  recipesLayoutComponent = (
    <Provider store={store}>
      <SearchBar />
      <Recipe />
      <RecipesLayout />
    </Provider>
  );
});

describe("RecipesLayout component", () => {
  test("should display an empty string if there are no recipes", () => {
    render(recipesLayoutComponent);
    expect(screen.queryByTestId("recipesLayoutID").textContent).toContain("");
    expect(store.getState().recipes.length).toBe(0);
    expect(store.getState().showRecipes).toBeFalsy();
  });

  test("should update the store and browser with recipes", async () => {
    const mockResponse = {
      hits: [
        {
          recipe: {
            label: "Chicken Vesuvio",
            image:
              "https://edamam-product-images.s3.amazonaws.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLWVhc3QtMSJGMEQCIBerImS28ihaZnl1XrA5Hn7S%2BwCLP5h4MA0x1QZhlzHcAiAlTA%2FuBFHC6IgCkY9ESiapNLRDP0%2Bz7crxhz1gsYt1EyrCBQjy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIM5e7DNpofrK0CN2kaKpYF2GyZjETL6oNOvCu3GrfxM8CtoKC%2F5JB4%2B2HgfK82qaGjGGgMPtu0Oc3iBUIRe7yOyafZjRYG6RRY3%2BB%2FBHog2vlOchdeGnt%2B0ENN%2FiGlhwHdD6Qt9wkuiQTkzmaw9LU7pKCzfGwCW7mqKnLUT4i8vgpPN9ZzoAPeSn0CIVjFLaOAAc2glqQlNRElkpRAimbp%2BKGR8SVqKywuXedjuroL9YdLHd%2B1MjdCkTaCNSGktFjUHEaRMWkwxLWMMvZF%2F2tIeU5KAjmwTT3zTqkhU9WfJ9yrYko1gFGFkVm0KFv2t%2BrEzzcONMDj7%2BAFEraeoP5xKbG%2B1AljZYiVWOnY0BPJk8RbX9ELjdM%2FKZofT0Vir6oh5YPsn2G8w5IbxSRFAAyAJuxkfbR678%2BnJVz53lp7JGrDfIGk5DIJNskr6%2BZsngvCdB2pDJb2FLsMJ76tCXmQ6gUywh%2B%2FjDzB74ZsRl3z8ZjNdZKbr7tCyCxlYOGvnd9u4VpLRTQjZL%2F7xoL6AjmZnYJaYlJCemCqMUOkXaNvcB0s0sVh%2FJhd3AmGNCBCKfUAqyA%2FHTrCkch9LTl352uvPV2kluLWO5nosiXCY1k63hBvBr1fbi28qKOGztT2YQlvqHxF%2Bh3XMK8nF0xbVaG6bgmZttNUgUyir7QsVfV5sL2FGuJNv6Fw4jQg386sX4gVRa%2FltaBbGyJNkla4SR9V9HY53Aj33YE0zNHxnkg3DyItMrrgxRAJBVo23GByhFfh0BvVjpOVXxff6TdqtvLMTLi%2FqKZgAR7mH97%2B1yGS0d0N%2F2X2dKi795RrOdh7zsiN8uZShIobD3JmpVPhnczVpZnDxxbpFc5UCQEqOI9g9B8bqrYWGwbPIqMU366gbmCKI6rIIa4w6ZOqpgY6sgGJ66z8lWXmGOmXvLifN6xHA2lRSRauhSy%2BGjyLe3ekZzQKpGGBhNjqYfqW7nLcxMsSSWOYynPVWDY4xVp3iXgtU5Odd7r66IXc%2B%2BLp0bKiDS0zzLRUq%2Bqc9G8K1XuOByB3OaFsPrhYtoIzN4Gmzy75EtaodGVFsvzPL%2BOcATg0Pww8CzWk85JCQuZczAfbLhw5%2FMJT%2FXGZHRzs73Y6TrfrZ%2BydV%2Ff8uiTG4bXbgA7CX90C&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230802T182725Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFDG2NIPSM%2F20230802%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=6e19a58794c7691cff1046f3c082e5f0c527aaa4af7f9c6998f99000fb8f4509",
            ingredients: [
              "1/2 cup olive oil",
              "5 cloves garlic, peeled",
              "2 large russet potatoes, peeled and cut into chunks",
              "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
              "3/4 cup white wine",
              "3/4 cup chicken stock",
              "3 tablespoons chopped parsley",
              "1 tablespoon dried oregano",
              "Salt and pepper",
              "1 cup frozen peas, thawed",
            ],
          },
        },
      ],
    };

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    expect(store.getState().recipes.length).toBe(0);

    await waitFor(async () => {
      render(recipesLayoutComponent);
      await store.dispatch(setAllRecipes(mockResponse.hits));
      store.dispatch(showRecipes(true));
    });

    expect(store.getState().recipes).toBe(mockResponse.hits);
    const recipeElement = screen.getAllByTestId("recipeID")[0];
    expect(recipeElement).toBeInTheDocument();
  });
});
