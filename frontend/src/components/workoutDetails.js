import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutDetails = ({workout}) => {
    const { dispatch } = useWorkoutsContext()  

    const handleClick = async () => {
        const responce = await fetch('http://localhost:4500/api/workouts/' + workout._id,{
            method: 'DELETE'
        })
        const json = await responce.json()

        if (responce.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: workout._id})
        }
    }
    
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load: </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}

export default WorkoutDetails;