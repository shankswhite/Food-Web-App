import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HeaderComponent from '../components/HeaderComponent'
import FooterComponent from '../components/FooterComponent'

import './FoodApp.css'
import RecipeComponent from '../components/RecipeComponent'
import RecipeListComponent from '../components/RecipeListComponent'
import ErrorComponent from '../components/ErrorComponent'
import IngredientsListComponent from '../components/IngredientsListComponent'

export default function FoodApp() {
    return (
        <div className="FoodApp">
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path='/' element={ <RecipeListComponent /> } />
                    
                    <Route path='/recipes' element={
                        <RecipeListComponent /> 
                    } />

                    <Route path='/recipes/:recipeNo' element={
                        <RecipeComponent /> 
                    } />

                    <Route path='/bags' element={
                        <IngredientsListComponent /> 
                    } />
                    
                    <Route path='*' element={<ErrorComponent /> } />

                </Routes>
                {/* <FooterComponent /> */}
            </BrowserRouter>
        </div>
    )
}