import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helper';
export const state = {
  recipe: {},
};

export async function recipeShow(id) {
  try {
    let data = await getJSON(API_URL + id);
    let recipe = data.data.recipe;
    state.recipe = recipe;
  } catch (error) {
    alert(error);
  }
}
