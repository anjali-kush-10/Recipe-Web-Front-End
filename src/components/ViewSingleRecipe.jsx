import React, { useEffect, useState } from 'react';
import Container from './layout/Container';
import { useSelector } from 'react-redux';
import { readRecipe } from '../ApiRequests/recipeApiRequests';
import { useParams } from 'react-router-dom';

const ViewSingleRecipe = () => {

    const [data, setData] = useState({});

    const token = useSelector(state => state.auth.token);

    const { id } = useParams();

    const fetchRecipe = async (id) => {
        try {

            const response = await readRecipe(token, id);
            console.log(response.data.findRecipeById, "response on reading recipeeeeee");
            setData(response.data.findRecipeById);

        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRecipe(id);
    }, [id]);


    return (
        <Container>
            <div className="container-fluid">
                <main className="tm-main">
                    <div className="bg-light p-2 text-center shadow rounded mb-5" >
                        <h1 className="text-3xl font-bold text-gray-800">
                            {data.title}
                        </h1>
                        <p className="text-gray-500 mt-1">Read Recipes Here !!! 🥘</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Description Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Description</h2>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                {data.description}
                            </ul>
                        </div>

                        {/* Instructions Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Instructions</h2>
                            <ol className="list-decimal pl-5 text-gray-700 space-y-3">
                                {data.instructions}
                            </ol>
                        </div>
                    </div>

                </main>
            </div>
        </Container>
    );
};

export default ViewSingleRecipe;
