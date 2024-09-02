import React from 'react';

import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar'
import Login from './components/login'
import Signup from './components/signup'
import Home from './components/home'
import TrainResults from './components/TrainResults';

const App = () => {
    return (
        // <Router>
        //     <Routes>
        //         <Route path="/" element={<Home/>}/>
        //     </Routes>
        // </Router>
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path='/signup' element={<Signup />}/>
                <Route path="/" element={<Home />} />
                <Route path="/train-results" element={<TrainResults />} />
            </Routes>
        </Router>
    );
};

export default App;