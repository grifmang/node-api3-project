import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowPosts = () => {

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user) {
            axios
            .get(`https://api3-project-lambda.herokuapp.com/api/user/${user}/posts`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(err => console.log(err.response));
        }
    }, [user]);

    useEffect(() => {
        axios
        .get('https://api3-project-lambda.herokuapp.com/api/users')
        .then(response => {
            response.data.map(element => {
                setUsers([...users, element.name]);
            })
        })
        .catch(err => console.log(err.response));
    }, []);

    return (
        <section className="section">
            <div className="container">
                <div className="field">
                    <div className="control">
                        <div className="select is-medium">
                        <select>
                            <option value="">Select User</option>
                            {users
                            ? users.map(element => {
                                return <option value={element}>{element}</option>
                            })
                            : null}
                        </select>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShowPosts;