import { useEffect, useState, useCallback } from "react";
import { retrieveAllrecipesApi, updateIngredientApi  } from '../api/FoodApiService';

function IngredientsListComponent() {
    
    const [ingredients, setIngredients] = useState([]);
    const [message, setMessage] = useState(null);
    
    const reloadIngredients = useCallback(() => {
        retrieveAllrecipesApi()
            .then(response => {
                const updatedRecipes = response.data;
    
                const ingredientCounts = new Map();
    
                updatedRecipes.forEach(recipe => {
                    const recipeMultiplier = typeof recipe.number === 'number' ? recipe.number : 1;
    
                    Object.entries(recipe.ingredients).forEach(([name, quantity]) => {
                        const totalQuantity = (ingredientCounts.get(name) || 0) + (quantity * recipeMultiplier);
                        ingredientCounts.set(name, totalQuantity);
                    });
                });
    
                const newIngredients = Array.from(ingredientCounts, ([name, quantity]) => ({
                    name,
                    quantity
                }));
                setIngredients(newIngredients);
                updateIngredientDatabase(newIngredients);
            })
            .catch(error => {
                console.log(error);
                setMessage("Could not fetch recipes, please check your connection.");
            });
    }, []);

    useEffect(() => {
        reloadIngredients();
    }, [reloadIngredients]);

    function updateIngredientDatabase(newIngredients) {
        newIngredients.forEach(ingredient => {
            updateIngredientApi(ingredient.name, { number: ingredient.quantity })
                .then(response => console.log(`Updated ingredient: ${ingredient.name}`))
                .catch(error => console.log(`Error updating ingredient: ${ingredient.name}`, error));
        });
    }

    return (
        <div className="container">
            <h1>Ingredients List</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map((ingredient, index) => (
                        <tr key={index}>
                            <td>{ingredient.name}</td>
                            <td>{ingredient.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );    
}

export default IngredientsListComponent;
