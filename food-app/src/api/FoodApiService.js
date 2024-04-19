import { apiClient } from './ApiClient'

export const retrieveAllrecipesApi
    = () => apiClient.get(`/recipes`)

export const getRecipeCountApi
    = () => apiClient.get(`/recipes/count`)

export const retrieveRecipeApi
    = (recipeNo) => apiClient.get(`/recipes/${recipeNo}`)

export const deleteRecipeApi
    = (recipeNo) => apiClient.delete(`/recipes/${recipeNo}`)

export const updateRecipeApi 
    = (recipeNo, recipe) => apiClient.put(`/recipes/${recipeNo}`, recipe, {
        headers: {
            'Content-Type': 'application/json'
        }
});

export const createRecipeApi 
    = (recipeNo, recipe) => apiClient.post(`/recipes/${recipeNo}`, recipe, {
        headers: {
            'Content-Type': 'application/json'
        }
});

