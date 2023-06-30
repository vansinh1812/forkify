import * as model from '../js/model.js';
import recipeView from '../js/views/recipeView.js';
import searchView from '../js/views/searchView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    //1.loading recipe
    await model.loadRecipe(id);
    //2.rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// window.addEventListener('hashchange' controlRecipes)
// window.addEventListener('load' controlRecipes)
const controlSearchResults = async function () {
  try {
    // 1. get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2. lode search results
    await model.loadSearchResults(query);
    //3. render results 
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
