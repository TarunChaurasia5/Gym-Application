import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Select, MenuItem, Grid } from '@mui/material';

const ExercisePattern = () => {
  const [pattern, setPattern] = useState({
    mon: '',
    tue: '',
    wed: '',
    thu: '',
    fri: '',
    sat: '',
    sun: '',
  });

  const [savedPattern, setSavedPattern] = useState({});
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(30);

  const audioRef = useRef(null);

  const handleChange = (day) => (event) => {
    setPattern({ ...pattern, [day]: event.target.value });
  };

  const handleSubmit = () => {
    setSavedPattern(pattern);
    localStorage.setItem('exercisePattern', JSON.stringify(pattern));
    console.log('Exercise Pattern saved:', pattern);
  };

  const startTimer = () => {
    if (audioRef.current) {
      audioRef.current.load(); // Ensure audio is loaded before the timer starts
    }
    setTimer(selectedDuration);
    setIsActive(true);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error('Audio playback failed:', error);
      });
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isActive) {
      clearInterval(interval);
      setIsActive(false);
      playAudio(); // Trigger audio playback here
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  return (
    <Box>
      <Typography variant="h3" mb={2} marginLeft={65}>Set Your Exercise Routine</Typography>
      {Object.keys(pattern).map((day) => (
        <Select
          key={day}
          value={pattern[day]}
          onChange={handleChange(day)}
          displayEmpty
          sx={{ mb: 2, minWidth: 120 }}
          space-x-4
        >
          <MenuItem value="" disabled>{day.charAt(0).toUpperCase() + day.slice(1)}</MenuItem>
          <MenuItem value="Back Day">Back Day</MenuItem>
          <MenuItem value="Cardio Day">Cardio Day</MenuItem>
          <MenuItem value="Chest Day">Chest Day</MenuItem>
          <MenuItem value="Arms Day">Arms Day</MenuItem>
          <MenuItem value="Legs Day">Legs Day</MenuItem>
          <MenuItem value="Neck Day">Neck Day</MenuItem>
          <MenuItem value="Waist Day">Waist Day</MenuItem>
          <MenuItem value="Rest">Rest Day</MenuItem>
        </Select>
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Save Pattern
      </Button>

      {/* Display Saved Pattern */}
      <Box mt={4}>
        <Typography variant="h3" marginLeft={75}>Saved Routine:</Typography>
        {Object.keys(savedPattern).length > 0 ? (
          <Grid container spacing={2} mt={2}>
            {Object.entries(savedPattern).map(([day, activity]) => (
              <Grid item xs={12} sm={6} md={4} key={day}>
                <Box border={1} p={2} borderRadius={2}>
                  <Typography variant="h6">
                    {day.charAt(0).toUpperCase() + day.slice(1)}:
                  </Typography>
                  <Typography>{activity || 'No activity set'}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No routine saved yet.</Typography>
        )}
      </Box>

      {/* Timer Section */}
      <Box mt={4} mr={5} marginLeft={85}>
        <Typography variant="h3">Timer:</Typography>
        <Typography variant="h6" >
          {timer > 0 
            ? `${Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)}` 
            : 'Time is up!'}
        </Typography>

        {/* Timer Duration Selection */}
        <Select
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
          displayEmpty
          sx={{ mb: 2, minWidth: 120 }}
          
        >
          <MenuItem value={5}>5 seconds</MenuItem>
          <MenuItem value={60}>1 minute</MenuItem>
          <MenuItem value={120}>2 minutes</MenuItem>
          <MenuItem value={900}>15 minutes</MenuItem>
          <MenuItem value={1800}>30 minutes</MenuItem>
          <MenuItem value={3600}>1 hour</MenuItem>
        </Select>
        <Button variant="contained" color="secondary" onClick={startTimer} disabled={isActive} >
          Start Timer
        </Button>
      </Box>
      {/* Ensure audio can play after user interaction */}
      <audio ref={audioRef} src="./audio/timeout.mp3" preload="auto" />
    </Box>
  );
};

export default ExercisePattern;
