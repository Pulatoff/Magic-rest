import { async } from 'regenerator-runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/search';
import resultsView from './views/resultsView';
import pagination from './views/pagination';

// if (module.hot) {
//   module.hot.accept();
// }

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

async function renderRight() {
  try {
    const id = window.location.hash.slice(1);
    recipeView.spinner();
    await model.recipeShow(id);
    // await Promise.race([ timeout(5)]);
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

pagination._addHandleClick(paginationControler);
recipeView.addHandleEvent(renderRight);
searchView.addHandleEvent(searchControler);
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
