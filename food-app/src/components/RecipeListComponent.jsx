import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { retrieveAllrecipesApi, updateRecipeApi } from '../api/FoodApiService';

function RecipeListComponent() {
    const navigate = useNavigate();
    
    const [recipes, setRecipes] = useState([]);
    const [message, setMessage] = useState(null);
    
    useEffect(() => {
        refreshRecipes();
    }, []);

    useEffect(() => {
        return () => {
            recipes.forEach(recipe => {
                if (recipe.initialNumber !== recipe.number) {
                    console.log("recipe number " + recipe.recipeNo)
                    updateRecipeApi(recipe.recipeNo, recipe)
                        .then(() => console.log(`Updated ${recipe.name}`))
                        .catch(error => console.log("Failed to update recipe number:", error));
                }
            });
        };
    }, [recipes]);

    function refreshRecipes() {
        retrieveAllrecipesApi()
            .then(response => {
                const updatedRecipes = response.data.map(recipe => ({
                    ...recipe,
                    initialNumber: recipe.number  // Store initial number to compare later
                }));
                setRecipes(updatedRecipes);
            })
            .catch(error => {
                console.log(error);
                setMessage("Could not fetch recipes, please check your connection.");
            });
    }

    function handleNumberChange(e, id) {
        const newRecipes = recipes.map(recipe => 
            recipe.id === id ? { ...recipe, number: e.target.value } : recipe
        );
        setRecipes(newRecipes);
    }

    function handleUpdate(recipeNo) {
        navigate(`/recipes/${recipeNo}`);
    }

    return (
        <div className="container">
            <h1>Recipes List</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map(recipe => (
                        <tr key={recipe.id}>
                            <td style={{ verticalAlign: 'middle' }}><img src={recipe.recipePic} alt={recipe.name} style={{ width: "300px", height: "200px" }} /></td>
                            <td style={{ verticalAlign: 'middle' }}>{recipe.name}</td>
                            <td style={{ verticalAlign: 'middle' }}>
                                <input
                                    type="text"
                                    value={recipe.number}
                                    onChange={(e) => handleNumberChange(e, recipe.id)}
                                />
                            </td>
                            <td style={{ verticalAlign: 'middle' }}>
                                <button className="btn btn-success" onClick={() => handleUpdate(recipe.recipeNo)}>
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecipeListComponent;
