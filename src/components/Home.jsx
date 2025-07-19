import React, { useEffect } from 'react'
import Container from './layout/Container'



const Home = () => {
    
    return (
        <>
            <Container>
                <div className="container-fluid">
                    <main className="tm-main">
                        {/* Search form */}
                        <div className="bg-light p-2 text-center shadow rounded mb-5" >
                            <h4>
                                Discover Amazing Recipes ✨ Also Share Yours! 🧑🏼‍🍳
                            </h4>
                        </div>

                        <div className="row tm-row">
                            <article className="col-12 col-md-6 tm-post">
                                {/* <hr className="tm-hr-primary" /> */}
                                <a href="post.html" className="effect-lily tm-post-link tm-pt-60">
                                    <div className="tm-post-link-inner">
                                        <img src="img/img-01.jpg" alt="Image" className="img-fluid" />
                                    </div>
                                    <span className="position-absolute tm-new-badge">New</span>
                                    <h2 className="tm-pt-30 tm-color-primary tm-post-title">Margerita Pizza</h2>
                                </a>
                                <p className="tm-pt-30">
                                    Relish the classic Margherita pizza with fresh basil, creamy mozzarella, and zesty tomato sauce — a favorite across India!
                                </p>


                            </article>
                            <article className="col-12 col-md-6 tm-post">
                                {/* <hr className="tm-hr-primary" /> */}
                                <a href="post.html" className="effect-lily tm-post-link tm-pt-60">
                                    <div className=" tm-post-link-inner">
                                        <img src="img/img-02.jpg" alt="Image" className="img-fluid" />
                                    </div>
                                    <span className="position-absolute tm-new-badge">New</span>
                                    <h2 className="tm-pt-30 tm-color-primary tm-post-title">Shahi Paneer</h2>
                                </a>
                                <p className="tm-pt-30">
                                    Shahi Paneer brings the richness of royal Indian flavors to your plate.
                                </p>


                            </article>
                            <article className="col-12 col-md-6 tm-post">
                                <hr className="tm-hr-primary" />
                                <a href="post.html" className="effect-lily tm-post-link tm-pt-20">
                                    <div className="tm-post-link-inner">
                                        <img src="img/img-03.jpg" alt="Image" className="img-fluid" />
                                    </div>
                                    <h2 className="tm-pt-30 tm-color-primary tm-post-title">Masala Dosa</h2>
                                </a>
                                <p className="tm-pt-30">
                                    Crispy, Spicy, and Truly South Indian
                                    Masala Dosa — a golden delight filled with flavorful potato masala and served with chutney & sambar.
                                </p>

                            </article>
                            <article className="col-12 col-md-6 tm-post">
                                <hr className="tm-hr-primary" />
                                <a href="post.html" className="effect-lily tm-post-link tm-pt-20">
                                    <div className="tm-post-link-inner">
                                        <img src="img/img-04.jpg" alt="Image" className="img-fluid" />
                                    </div>
                                    <h2 className="tm-pt-30 tm-color-primary tm-post-title">Delicious Fruit Custurd</h2>
                                </a>
                                <p className="tm-pt-30">
                                    Cool, Creamy & Loaded with Fruits
                                    Fruit Custard — the perfect sweet treat for every season!
                                </p>

                            </article>
                            <article className="col-12 col-md-6 tm-post">
                                <hr className="tm-hr-primary" />
                                <a href="post.html" className="effect-lily tm-post-link tm-pt-20">
                                    <div className="tm-post-link-inner">
                                        <img src="img/img-05.jpg" alt="Image" className="img-fluid" />
                                    </div>
                                    <h2 className="tm-pt-30 tm-color-primary tm-post-title">Dhokla</h2>
                                </a>
                                <p className="tm-pt-30">
                                    Light, Spongy & Full of Flavor
                                    Dhokla — the perfect steamed snack from Gujarat, loved all over India!
                                </p>
                            </article>
                            <article className="col-12 col-md-6 tm-post">
                                <hr className="tm-hr-primary" />
                                <a href="post.html" className="effect-lily tm-post-link tm-pt-20">
                                    <div className="tm-post-link-inner">
                                        <img src="img/img-06.jpg" alt="Image" className="img-fluid" />
                                    </div>
                                    <h2 className="tm-pt-30 tm-color-primary tm-post-title">Gulab Jamun</h2>
                                </a>
                                <p className="tm-pt-30">
                                    Soft, Syrupy & Simply Irresistible
                                    Gulab Jamun — the melt-in-mouth dessert that completes every Indian meal.
                                </p>
                            </article>
                        </div>
                        {/* <div className="row tm-row tm-mt-100 tm-mb-75">
                        <div className="tm-prev-next-wrapper">
                            <a href="#" className="mb-2 tm-btn tm-btn-primary tm-prev-next disabled tm-mr-20">Prev</a>
                            <a href="#" className="mb-2 tm-btn tm-btn-primary tm-prev-next">Next</a>
                        </div>
                        <div className="tm-paging-wrapper">
                            <span className="d-inline-block mr-3">Page</span>
                            <nav className="tm-paging-nav d-inline-block">
                                <ul>
                                    <li className="tm-paging-item active">
                                        <a href="#" className="mb-2 tm-btn tm-paging-link">1</a>
                                    </li>
                                    <li className="tm-paging-item">
                                        <a href="#" className="mb-2 tm-btn tm-paging-link">2</a>
                                    </li>
                                    <li className="tm-paging-item">
                                        <a href="#" className="mb-2 tm-btn tm-paging-link">3</a>
                                    </li>
                                    <li className="tm-paging-item">
                                        <a href="#" className="mb-2 tm-btn tm-paging-link">4</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div> */}

                    </main>
                </div>
            </Container>
        </>
    )
}

export default Home;