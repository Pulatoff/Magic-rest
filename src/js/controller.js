import * as model from './model';
import recipeView from './views/recipeView';

console.log(recipeView);
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

async function renderRight() {
  const id = window.location.hash.slice(1);
  await model.recipeShow(id);
  recipeView.render(model.state.recipe);
}

['hashchange', 'load'].map(val => {
  window.addEventListener(val, renderRight);
});
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
