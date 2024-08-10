const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

//get all
const getWorkouts = async (req, res) => {
    try{
        const workouts = await Workout.find({}).sort({createdAt: -1});
        res.status(200).json({workouts});
    } catch(error){
        res.status(404).json({error: error.message});
    }
}

//get one
const getWorkout = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No workout with that id"});
    }
    try{
        const workout = await Workout.findById(id);
        res.status(200).json({workout});
    } catch(error){
        res.status(404).json({error: "No workout found"});
    }
}


//create
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body;
    //add doc to db
    try{
        const workout = await Workout.create({title, load, reps});
        res.status(200).json({workout});
    } catch(error){
        res.status(400).json({error: error.message});
    }
    res.json({mssg: "POST workout"})
}

//update
// const updateWorkout = async (req, res) => {
//     const {id} = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: "No workout with that id"});
//     }
//     const workout = await Workout.findOneAndUpdate({_id: id}, {
//         ...req.body
//     });
//     if (!workout){
//         return res.status(404).json({error: "No workout found"});
//     }

//     res.status(200).json({workout});

// }

const updateWorkout = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const workout = await Workout.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(workout)
  }


//delete
const deleteWorkout = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No workout with that id"});
    }
    
    const workout = await Workout.findOneAndDelete({_id: id});
    if (!workout){
        return res.status(404).json({error: "No workout found"});
    }

    res.status(200).json({workout});

}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}