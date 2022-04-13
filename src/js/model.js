import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};

export async function recipeShow(id) {
  let dataJson = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );
  let data = await dataJson.json();
  let recipe = data.data.recipe;
  state.recipe = recipe;
}
