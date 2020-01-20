import React from 'react';
import ShowPosts from "./components/ShowPosts";
import { Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Route exact path='/' component={ShowPosts} />
    </>
  );
}

export default App;
