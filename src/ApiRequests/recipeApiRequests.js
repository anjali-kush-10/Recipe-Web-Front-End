import axios from "axios";

const apiUrl = `http://localhost:5000/recipe`;


export const getRecipeList = (token,search) => {

    return axios.get(`${apiUrl}/get-receipe-list?search=${search}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

export const addNewRecipe=(payload,token)=>{
    return axios.post(`${apiUrl}/create-recipe`,payload,{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    });
}


export const deleteRecipe=(token,id)=>{
    return axios.delete(`${apiUrl}/delete-recipe/${id}`,{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    });
}


export const updateRecipe=(payload,token,id)=>{
    return axios.patch(`${apiUrl}/update-recipe/${id}`,payload,{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    });
}


export const readRecipe=(token,id)=>{
    return axios.get(`${apiUrl}/read-recipe/${id}`,{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    });
}