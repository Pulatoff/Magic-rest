import { async } from 'regenerator-runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/search';
import resultsView from './views/resultsView';
import pagination from './views/pagination';

// if (module.hot) {
//   module.hot.accept();
// }

async function renderRight() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.spinner();
    await model.recipeShow(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.errorMesage(error);
  }
}

async function searchControler() {
  try {
    resultsView.spinner();
    let query = searchView.getValue();
    if (!query) return;
    await model.searchModel(query);
    resultsView.render(model.getSearchResultsPage());
    pagination._generatorHtml(model.state.search);
  } catch (error) {
    resultsView.errorMesage(error);
  }
}

function paginationControler(goto) {
  resultsView.render(model.getSearchResultsPage(goto));
  pagination._generatorHtml(model.state.search);
}

function servingsControler(num) {
  model.servings(num);
  recipeView.render(model.state.recipe);
}

pagination._addHandleClick(paginationControler);
recipeView.addHandleEvent(renderRight);
searchView.addHandleEvent(searchControler);
recipeView.addHandleEventServings(servingsControler);
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
