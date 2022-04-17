import { pad } from 'lodash-es';
import { async } from 'regenerator-runtime';
import { API_URL, PAGECOUNT } from './config';
import { getJSON } from './helper';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: PAGECOUNT,
  },
};

export async function recipeShow(id) {
  try {
    let data = await getJSON(API_URL + id);
    let recipe = data.data.recipe;
    state.recipe = recipe;
  } catch (error) {
    throw error;
  }
}

export async function searchModel(query) {
  try {
    state.search.query = query;
    let data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(element => {
      return element;
    });
  } catch (error) {
    throw error;
  }
}

export function getSearchResultsPage(page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
}

export function servings(peopleNumber) {
  state.recipe.ingredients.map(val => {
    val.quantity = (val.quantity / state.recipe.servings) * peopleNumber;
  });
  state.recipe.servings = peopleNumber;
}
