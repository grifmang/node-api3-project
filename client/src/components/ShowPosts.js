import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowPosts = () => {

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user) {
            axios
            .get(`https://api3-project-lambda.herokuapp.com/api/users/${user.id}/posts`)
            .then(response => {
                response.data.map(element => {
                    return setPosts((aPost) => [...aPost, element])
                })
            })
            .catch(err => console.log(err.response));
        }
    }, [user]);

    useEffect(() => {
        axios
        .get('https://api3-project-lambda.herokuapp.com/api/users')
        .then(response => {
            response.data.map(element => {
                return setUsers((prevUser) => [...prevUser, element]);
            })
        })
        .catch(err => console.log(err.response));
    }, []);

    const handleChanges = e => {
        users.map(element => {
            return e.target.value === element.name ? setUser(element) : null
        })
    }

    // const addUser = () => {
    //     axios
    //     .post(``)
    // }

    return (
        <>
        <section className="section">
            <div className="container dropDown">
                <div className="field">
                    <div className="control">
                        <div className="select is-medium">
                            <select defaultValue='select' onChange={handleChanges}>
                                <option disabled value="select">Select User</option>
                                {users
                                ? users.map(element => {
                                    return <option key={element.id} value={element.name}>{element.name}</option>
                                })
                                : null}
                            </select>
                        </div>
                    </div>
                </div>
                {/* <div className='level'>
                    <button type='button' onClick={addUser}>Add User</button>
                    <button type='button' onClick={editUser}>Edit User</button>
                    <button type='button' onClick={deleteUser}>Delete User</button>
                </div> */}
            </div>
        </section>
        {posts.length > 0
        ? posts.map(element => {
            return <section key={element.id} className="hero is-light">
                <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        {user.name}
                    </h1>
                    <h2 className="subtitle">
                        {element.text}
                    </h2>
                </div>
                </div>
            </section>
        })
        : null}
        </>
    )
}

export default ShowPosts;