// src/pages/Home.js
import React, { useState } from 'react';
import { Box } from '@mui/material';

import HeroBanner from '../components/HeroBanner';
import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';
import ExercisePattern from '../components/ExercisePattern'; // Import the new component

const Home = () => {
  const [bodyPart, setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([]);
  const [pattern, setPattern] = useState(null); // Define pattern as state

  const handleSubmit = () => {
    if (pattern) {
      localStorage.setItem('exercisePattern', JSON.stringify(pattern));
      console.log('Exercise Pattern saved:', pattern);
    } else {
      console.error('Pattern is not defined');
    }
  };

  return (
    <Box>
      <HeroBanner />
      <SearchExercises 
        setExercises={setExercises} 
        bodyPart={bodyPart}
        setBodyPart={setBodyPart} 
      />
      <ExercisePattern 
        pattern={pattern} 
        setPattern={setPattern} 
        handleSubmit={handleSubmit} // Pass handleSubmit if needed
      />
      <Exercises
        exercises={exercises}
        setExercises={setExercises} 
        bodyPart={bodyPart}
      />
    </Box>
  );
};

export default Home;
