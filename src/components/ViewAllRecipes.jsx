import React, { useEffect, useState } from 'react';
import Container from './layout/Container';
import useRecipes from '../hooks/useRecipes';
import { IoCloseCircle } from "react-icons/io5";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { addNewRecipe, deleteRecipe } from '../ApiRequests/recipeApiRequests';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';



const ViewAllRecipes = () => {

    const token = useSelector(state => state.auth.token);

    const { recipes,handleRecipes, loading, error, setSearch } = useRecipes();



    
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
                                data-bs-target="#addUserModalForm"
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
                                            <button className="btn btn-sm ms-2">
                                                👁️
                                            </button>
                                            <button className="btn btn-sm ms-2"
                                                onClick={() => handleDeleteRecipe(recipe.id)}
                                            >
                                                ❌
                                            </button>
                                            <button className="btn btn-sm text-white">
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
                <div className="modal fade" id="addUserModalForm" >
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Recipe</h5>
                                <a href="#" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <IoCloseCircle />
                                </a>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={addRecipe.handleSubmit} className="form-validate is-alter">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="title">Title</label>
                                        <div className="form-control-wrap">
                                            <input type="text" className="form-control" id="title" name='title'
                                                {...addRecipe.getFieldProps('title')}
                                            />
                                        </div>
                                        {
                                            addRecipe.touched.title && addRecipe.errors.title
                                                ? <div className='invalid-feedback' style={{ display: "block" }}>{addRecipe.errors.title}</div>
                                                : ""
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="description">Description</label>
                                        <div className="form-control-wrap">
                                            <input type="text" className="form-control" id="description" name='description'
                                                {...addRecipe.getFieldProps('description')}
                                            />
                                        </div>
                                        {
                                            addRecipe.touched.description && addRecipe.errors.description
                                                ? <div className='invalid-feedback' style={{ display: "block" }}>{addRecipe.errors.description}</div>
                                                : ""
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="instructions">Instructions</label>
                                        <div className="form-control-wrap">
                                            <textarea type="text" className="form-control" id="instructions"
                                                name='instructions' cols={10} rows={10}
                                                {...addRecipe.getFieldProps('instructions')}
                                            ></textarea>
                                        </div>
                                        {
                                            addRecipe.touched.instructions && addRecipe.errors.instructions
                                                ? <div className='invalid-feedback' style={{ display: "block" }}>{addRecipe.errors.instructions}</div>
                                                : ""
                                        }

                                    </div>
                                    <div className="form-group d-flex justify-content-center">
                                        <button type="submit" className="btn btn-lg btn-primary"
                                            data-bs-dismiss="modal"
                                        >Save Recipe</button>
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
