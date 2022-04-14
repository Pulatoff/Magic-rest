import * as model from './model';
import recipeView from './views/recipeView';

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
    await Promise.race([model.recipeShow(id), timeout(5)]);
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
}

['hashchange', 'load'].map(val => {
  window.addEventListener(val, renderRight);
});

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
