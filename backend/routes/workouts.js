const express = require('express');
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//requireAuth middleware
router.use(requireAuth);

//get all
router.get('/', getWorkouts);

//get one
router.get('/:id', getWorkout);

//post
router.post('/', createWorkout);

//update
router.patch('/:id', updateWorkout);

//delete
router.delete('/:id', deleteWorkout);

module.exports = router;