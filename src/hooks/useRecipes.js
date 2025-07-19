import React, { useEffect, useState } from 'react'
import { getRecipeList } from '../ApiRequests/recipeApiRequests';
import { useSelector } from 'react-redux';

const useRecipes = () => {

    const token = useSelector(state => state.auth.token);
    
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const handleRecipes = async () => {
        try {

            const response = await getRecipeList(token,search);
            // console.log(response.data,"Responseon useRecipes");
            setRecipes(response.data.findRecipes);
        }
        catch (error) {
            console.log(error);
            setError(error.message);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleRecipes(search);
    }, [search]);

    return { recipes,handleRecipes, loading, error,search,setSearch};

  return (
    <>
    
    </>
  )
}

export default useRecipes;