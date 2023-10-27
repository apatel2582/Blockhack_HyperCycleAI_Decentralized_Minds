import React, { useState } from 'react';
import './App.css';
import Analysis from './components/Analysis';
import Footer from './components/Footer';
import Main from './components/Main';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
    const [analysis, setAnalysis] = useState(null);
    const [file, setFile] = useState("");

    return (
        <ChakraProvider>
            <div className="App">
                <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Main onUpload={setAnalysis} fileHandle={setFile} file={file} />} />
                    <Route path="/analysis" element={<Analysis analysis={analysis} file={file} />} />
                </Routes>
                <Footer />
                </Router>
            </div>
        </ChakraProvider>    
    );
  }

export default App;