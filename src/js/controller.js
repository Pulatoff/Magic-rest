const recipeContainer = document.querySelector('.recipe');
import icons from '../img/icons.svg';
import * as model from './model';
import { RecipeView } from './views/recipeView';

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
  renderHtml(model.state.recipe);
  let recipeIngridient = model.state.recipe.ingredients;
  recipeIngridient.forEach(element => {
    reseptIngridient(element);
  });
}

function reseptIngridient(obj) {
  let html = `
  <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${obj.quantity ? obj.quantity : ''}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${obj.unit}</span>
        ${obj.description}
      </div>
    </li>`;
  document
    .querySelector('.recipe__ingredient-list')
    .insertAdjacentHTML('afterbegin', html);
}

['hashchange', 'load'].map(val => {
  window.addEventListener(val, renderRight);
});
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
