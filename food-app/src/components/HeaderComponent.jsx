import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate here
import { useRecipeCount } from '../util/useRecipeCount';
// import { retrieveRecipeApi } from '../api/FoodApiService';
// import { useState } from 'react';

function HeaderComponent() {
    const navigate = useNavigate() // Define navigate using the useNavigate hook
    const recipeCount = useRecipeCount() // This might asynchronously update
    const newRecipeNo = recipeCount + 1

    function addNewRecipe() {
        navigate(`/recipes/${newRecipeNo}`) // Correctly using template literals for dynamic route

        console.log("clicked" + newRecipeNo)
    }

    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.acfun.com">OnKitchen</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/recipes">DISHES</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/recipes">CATEGORIES</Link>
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {/* Changed onClick to handle the addition of new recipe */}
                                <button className="btn btn-primary" style={{ marginRight: '20px' }} onClick={addNewRecipe}>
                                    Add Recipe
                                </button>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/bag">Your Bag</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default HeaderComponent;
