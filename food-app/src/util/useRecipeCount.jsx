import { useState, useEffect } from 'react';
import { getRecipeCountApi } from '../api/FoodApiService'

export function useRecipeCount() {
    const [count, setCount] = useState("");

    useEffect(() => {
        getRecipeCountApi()
            .then(response => {
                setCount(response.data);
                // console.log(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch recipe count:', error);
                setCount(0);
            });
    }, []);

    return count;
}
