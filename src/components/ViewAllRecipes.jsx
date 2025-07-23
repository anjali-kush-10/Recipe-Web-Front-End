import React, { useEffect, useState } from 'react';
import Container from './layout/Container';
import useRecipes from '../hooks/useRecipes';
import { IoCloseCircle } from "react-icons/io5";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { addNewRecipe, deleteRecipe, updateRecipe } from '../ApiRequests/recipeApiRequests';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



const ViewAllRecipes = () => {

    const token = useSelector(state => state.auth.token);

    const { recipes, handleRecipes, loading, error, setSearch } = useRecipes();

    const navigate=useNavigate();

    const addRecipe = useFormik({
        initialValues: {
            title: '',
            description: '',
            instructions: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            instructions: Yup.string().required('Instructions is required')
        }),
        onSubmit: async (values) => {
            const payload = {
                title: values.title,
                description: values.description,
                instructions: values.instructions,
            }

            try {
                const response = await addNewRecipe(payload, token);
                await handleRecipes();
                // console.log(response, "response on adding new recipe");

            } catch (err) {
                console.error(err);
            }
        }

    });


    const handleDeleteRecipe = async (id) => {

        console.log("Deleting Recipe ID:", id);  // add this

        if (!id) {
            Swal.fire("Error", "Invalid recipe ID", "error");
            return;
        }

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to recover this recipe!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0CC',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await deleteRecipe(token, id);
                await handleRecipes();
                // console.log(response, "Recipe deleted");

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your recipe has been deleted.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });

                // Optional: refresh list or redirect
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong while deleting.',
                    icon: 'error',
                });
            }
        }
    };

    const [id, setID] = useState();

    const editRecipe = useFormik({
        initialValues: {
            title: '',
            description: '',
            instructions: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            instructions: Yup.string().required('Instructions is required')
        }),
        onSubmit: async (values) => {
            const payload = {
                title: values.title,
                description: values.description,
                instructions: values.instructions,
            }

            try {
                const response = await updateRecipe(payload, token, id);
                console.log(response, "response on adding new recipe");
                await handleRecipes();

            } catch (err) {
                console.error(err);
            }
        }

    });

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error:{error}</p>
    }

    return (
        <>
            <Container>
                <div className="container-fluid">
                    <main className="tm-main">
                        <div className="bg-light p-2 text-center shadow rounded mb-5" >
                            <h4>
                                View All Recipes 🥘
                            </h4>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            {/* Search Input with Icon inside */}
                            <div className="position-relative w-50">
                                <input
                                    type="text"
                                    className="form-control ps-5 rounded-pill"
                                    placeholder="Search recipes..."
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{ height: "36px" }}
                                />

                            </div>

                            {/* Add Recipe Button */}
                            <button className="btn text-white"
                                data-bs-toggle="modal"
                                data-bs-target="#addRecipeModalForm"
                                style={{ backgroundColor: "#0CC" }}>
                                ➕ Add Recipe
                            </button>
                        </div>

                        <table className="table table-bordered table-striped table-hover shadow">
                            <thead className="table-dark">
                                <tr>
                                    {/* <th>Image</th> */}
                                    <th>Recipe Name</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {recipes.map((recipe, index) => ( */}
                                {recipes.map((recipe, index) => (
                                    <tr key={index}>
                                        <td>{recipe.title}</td>
                                        <td>
                                            {recipe.description.split(" ").slice(0, 4).join(" ")}...
                                        </td>

                                        <td>
                                            <button className="btn btn-sm ms-2"
                                                onClick={() => navigate(`/view-recipe/${recipe.id}`)}
                                            >
                                                👁️
                                            </button>
                                            <button className="btn btn-sm ms-2"
                                                onClick={() => handleDeleteRecipe(recipe.id)}>
                                                ❌
                                            </button>
                                            <button className="btn btn-sm text-white"
                                                data-bs-toggle="modal"
                                                data-bs-target="#editRecipeModalForm"
                                                onClick={() => {
                                                    editRecipe.setFieldValue('title', recipe.title);
                                                    editRecipe.setFieldValue('description', recipe.description);
                                                    editRecipe.setFieldValue('instructions', recipe.instructions);
                                                    setID(recipe.id);
                                                    // console.log(item);
                                                }}
                                            >
                                                📝
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>

                {/*Add Recipe Modal*/}
                <div className="modal fade" id="addRecipeModalForm">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content shadow rounded-4 border-0">

                            <div className="modal-header border-bottom-0 pb-0 bg-light rounded-top-4 position-relative">

                                <div className="w-100 text-center">
                                    <h4 className="modal-title fw-bold  rounded"
                                    >
                                        {/* <span role="img" aria-label="plate">🍽️</span> */}
                                        {/* Add a <span className="text">New Recipe</span> */}
                                        <span className="text" style={{ color: "black" }} >Add a New Recipe</span>

                                    </h4>
                                    <p className="text-muted fst-italic mt-1 mb-0">Share your delicious creation with the world !!!</p>
                                </div>
                                {/* <button
                                type="button"
                                className="btn-close position-absolute end-0 top-0 m-3"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button> */}
                                <a href="#" className="btn-close position-absolute end-0 top-0 m-3" data-bs-dismiss="modal" aria-label="Close">
                                </a>

                            </div>



                            <div className="modal-body p-4"  >
                                <form onSubmit={addRecipe.handleSubmit} className="form-validate is-alter">
                                    <div className="form-group mb-3">
                                        <label className="form-label" htmlFor="title">Title</label>
                                        <input
                                            style={{ backgroundColor: "#edf5ef" }}
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="title"
                                            name="title"
                                            placeholder="e.g., Crispy Corn"
                                            {...addRecipe.getFieldProps('title')}
                                        />
                                        {addRecipe.touched.title && addRecipe.errors.title && (
                                            <div className="invalid-feedback d-block">{addRecipe.errors.title}</div>
                                        )}
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="form-label" htmlFor="description">Description</label>
                                        <input
                                            style={{ backgroundColor: "#edf5ef" }}
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="description"
                                            name="description"
                                            placeholder="Short description of the dish"
                                            {...addRecipe.getFieldProps('description')}
                                        />
                                        {addRecipe.touched.description && addRecipe.errors.description && (
                                            <div className="invalid-feedback d-block">{addRecipe.errors.description}</div>
                                        )}
                                    </div>

                                    <div className="form-group mb-4">
                                        <label className="form-label" htmlFor="instructions">Instructions</label>
                                        <textarea
                                            style={{ backgroundColor: "#edf5ef" }}
                                            className="form-control form-control-lg"
                                            id="instructions"
                                            name="instructions"
                                            rows={6}
                                            placeholder="Step-by-step preparation method"
                                            {...addRecipe.getFieldProps('instructions')}
                                        />
                                        {addRecipe.touched.instructions && addRecipe.errors.instructions && (
                                            <div className="invalid-feedback d-block">{addRecipe.errors.instructions}</div>
                                        )}
                                    </div>

                                    <div className="form-group text-center">
                                        <button type="submit" className="btn btn-lg btn-success px-3" data-bs-dismiss="modal">
                                            Save Recipe
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


                {/*Edit Recipe Modal*/}
                <div className="modal fade" id="editRecipeModalForm">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content shadow rounded-4 border-0">

                            <div className="modal-header border-bottom-0 pb-0 bg-light rounded-top-4 position-relative">

                                <div className="w-100 text-center">
                                    <h4 className="modal-title fw-bold  rounded"
                                    >
                                        <span className="text" style={{ color: "black" }} >Edit Recipe</span>

                                    </h4>
                                    {/* <p className="text-muted fst-italic mt-1 mb-0">Share your delicious creation with the world !!!</p> */}
                                </div>

                                <a href="#" className="btn-close position-absolute end-0 top-0 m-3" data-bs-dismiss="modal" aria-label="Close">
                                </a>
                            </div>

                            <div className="modal-body p-4"  >
                                <form onSubmit={editRecipe.handleSubmit} className="form-validate is-alter">
                                    <div className="form-group mb-3">
                                        <label className="form-label" htmlFor="title">Title</label>
                                        <input
                                            style={{ backgroundColor: "#edf5ef" }}
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="title"
                                            name="title"
                                            placeholder="e.g., Crispy Corn"
                                            {...editRecipe.getFieldProps('title')}
                                        />
                                        {editRecipe.touched.title && editRecipe.errors.title && (
                                            <div className="invalid-feedback d-block">{editRecipe.errors.title}</div>
                                        )}
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="form-label" htmlFor="description">Description</label>
                                        <input
                                            style={{ backgroundColor: "#edf5ef" }}
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="description"
                                            name="description"
                                            placeholder="Short description of the dish"
                                            {...editRecipe.getFieldProps('description')}
                                        />
                                        {editRecipe.touched.description && editRecipe.errors.description && (
                                            <div className="invalid-feedback d-block">{editRecipe.errors.description}</div>
                                        )}
                                    </div>

                                    <div className="form-group mb-4">
                                        <label className="form-label" htmlFor="instructions">Instructions</label>
                                        <textarea
                                            style={{ backgroundColor: "#edf5ef" }}
                                            className="form-control form-control-lg"
                                            id="instructions"
                                            name="instructions"
                                            rows={6}
                                            placeholder="Step-by-step preparation method"
                                            {...editRecipe.getFieldProps('instructions')}
                                        />
                                        {editRecipe.touched.instructions && editRecipe.errors.instructions && (
                                            <div className="invalid-feedback d-block">{editRecipe.errors.instructions}</div>
                                        )}
                                    </div>

                                    <div className="form-group text-center">
                                        <button type="submit" className="btn btn-lg btn-success px-3" data-bs-dismiss="modal">
                                            Save Recipe
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ViewAllRecipes;
