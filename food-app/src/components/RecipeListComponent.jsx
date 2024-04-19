import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { retrieveAllrecipesApi, deleteRecipeApi } from '../api/FoodApiService'

function RecipeListComponent() {
    const navigate = useNavigate()
    
    const [recipes,setRecipes] = useState([])

    const [message,setMessage] = useState(null)
    
    useEffect ( () => refreshRecipes(), [])

    function refreshRecipes() {
        
        retrieveAllrecipesApi()
        .then(response => {
            setRecipes(response.data)
        }
            
        )
        .catch(error => console.log(error))
    
    }

    // function deleteRecipe(id) {
    //     console.log('clicked ' + id)
    //     deleteTodoApi(username, id)
    //     .then(

    //         () => {
    //             setMessage(`Delete of todos with id = ${id} successful`)
    //             refreshTodos()
    //         }
    //         //1: Display message
    //         //2: Update Todos list
    //     )
    //     .catch(error => console.log(error))
    // }

    // function updateTodo(id) {
    //     console.log('clicked ' + id)
    //     navigate(`/todo/${id}`)
    // }

    // function addNewTodo() {
    //     navigate(`/todo/-1`)
    // }

    return (
        <div className="container">
            <h1>Recipes List</h1>
            
            {message && <div className="alert alert-warning">{message}</div>}

            
            <div>
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
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td> <button className="btn btn-warning" 
                                                    onClick={() => deleteTodo(todo.id)}>Delete</button> </td>
                                    <td> <button className="btn btn-success" 
                                                    onClick={() => updateTodo(todo.id)}>Update</button> </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}

export default ListTodosComponent