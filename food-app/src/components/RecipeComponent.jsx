import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { retrieveRecipeApi, updateRecipeApi, createRecipeApi, deleteRecipeApi } from '../api/FoodApiService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRecipeCount } from '../util/useRecipeCount';

export default function RecipeComponent() {
    const { recipeNo } = useParams();
    
    const [name, setName] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [tags, setTags] = useState([]);
    const [ingredients, setIngredients] = useState('');
    const [seasonings, setSeasonings] = useState([]);
    const [tutorial, setTutorial] = useState('');
    const [recipePic, setRecipePic] = useState('');
    const [number, setNumber] = useState('');

    const navigate = useNavigate();
    const recipeCount = useRecipeCount();

    const retrieveRecipes = useCallback(() => {
        if (recipeNo !== -1) {
            retrieveRecipeApi(recipeNo)
                .then(response => {
                    setName(response.data.name);
                    setCuisine(response.data.cuisine);
                    setTags(response.data.tags);
                    setIngredients(JSON.stringify(response.data.ingredients, null, 2)); // JSON string
                    setSeasonings(response.data.seasonings);
                    setTutorial(response.data.tutorial);
                    setRecipePic(response.data.recipePic);
                    setNumber(response.data.number);
                })
                .catch(error => console.log(error));
        }
    }, [recipeNo]);

    useEffect(() => {
        retrieveRecipes();
    }, [retrieveRecipes]);

    useEffect(() => {
        console.log("Current recipe count: " + recipeCount);
    }, [recipeCount]);

    function onSubmit(values) {
        try {
            const parsedIngredients = JSON.parse(values.ingredients); // Parse ingredients back to object

            const recipe = {
                name: values.name,
                cuisine: values.cuisine,
                tags: values.tags,
                ingredients: parsedIngredients,
                seasonings: values.seasonings,
                tutorial: values.tutorial,
                number: values.number
            };

            if (recipeNo > recipeCount) {
                createRecipeApi(recipeNo, recipe)
                    .then(response => {
                        navigate('/recipes');
                    })
                    .catch(error => console.log(error));
            } else {
                updateRecipeApi(recipeNo, recipe)
                    .then(response => {
                        navigate('/recipes');
                    })
                    .catch(error => console.log(error));
            }
        } catch (e) {
            alert("Invalid JSON format in ingredients.");
        }
    }

    function onDelete() {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            deleteRecipeApi(recipeNo)
                .then(() => {
                    navigate('/recipes');
                })
                .catch(error => console.log(error));
        }
    }

    function validate(values) {
        let errors = {};
        if (values.name.length < 5) {
            errors.name = 'Enter at least 5 characters';
        }
        try {
            JSON.parse(values.ingredients);
        } catch (e) {
            errors.ingredients = 'Ingredients must be valid JSON';
        }
        return errors;
    }

    return (
        <div className="container">
            <h1>Enter Recipe Details</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <img src={recipePic} alt="Recipe" style={{ maxWidth: '700px', maxHeight: '700px', marginRight: '20px', marginTop: '20px' }} />
                </div>
                <div style={{ flex: 1 }}>
                    <Formik
                        initialValues={{ name, cuisine, tags, ingredients, seasonings, tutorial, number }}
                        enableReinitialize={true}
                        onSubmit={onSubmit}
                        validate={validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {(props) => (
                            <Form>
                                <ErrorMessage name="name" component="div" className="alert alert-warning" />
                                <ErrorMessage name="ingredients" component="div" className="alert alert-warning" />

                                <fieldset className="form-group">
                                    <label>Name</label>
                                    <Field type="text" className="form-control" name="name" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Cuisine</label>
                                    <Field type="text" className="form-control" name="cuisine" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Ingredients</label>
                                    <Field as="textarea" className="form-control" name="ingredients" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Seasonings</label>
                                    <Field type="text" className="form-control" name="seasonings" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Tutorial</label>
                                    <Field type="text" className="form-control" name="tutorial" />
                                </fieldset>
                                <div>
                                    <button type="submit" className="btn btn-success m-5">Save</button>
                                    <button type="button" className="btn btn-danger m-5" onClick={onDelete}>Delete</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
