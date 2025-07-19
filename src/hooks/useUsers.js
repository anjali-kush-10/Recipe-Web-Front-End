import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../ApiRequests/userApiRequests';
import { useSelector } from 'react-redux';

const useUsers = () => {

    const token = useSelector(state => state.auth.token);
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const handleUsers = async () => {
        try {

            const response = await getAllUsers(token, search);
            // console.log(response,"Responseon useUsers");
            setUsers(response.data.user);
        }
        catch (error) {
            console.log(error);
            setError(error.message);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleUsers(search);
    }, [search]);

    return { users, loading, error,search,setSearch };
}

export default useUsers