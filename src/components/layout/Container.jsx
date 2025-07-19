import React from 'react'
import Sidebar from './Sidebar'
import Content from './Content'
import Header from './Header'
import Footer from './Footer'

const Container = ({ children }) => {
    return (
        <>
            <Header />
            <Sidebar />
            {children}
            <Footer />
        </>
    )
}

export default Container