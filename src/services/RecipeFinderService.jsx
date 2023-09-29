import axios from 'axios';

const RECIPE_FINDER_BASE_API_URL = 'http://localhost:8080/api/v1/recipe-finder';

export function getAllRecipes(){
    return axios.get(RECIPE_FINDER_BASE_API_URL);
}

export function createRecipe(recipe){
    return axios.post(RECIPE_FINDER_BASE_API_URL, recipe);
}

export function getById(id){
    return axios.get(`${RECIPE_FINDER_BASE_API_URL}/${id}`);
}

export function updateRecipe(id, recipe){
    return axios.put(`${RECIPE_FINDER_BASE_API_URL}/${id}`, recipe);
}

export function deleteRecipe(id){
    return axios.delete(`${RECIPE_FINDER_BASE_API_URL}/${id}`);
}