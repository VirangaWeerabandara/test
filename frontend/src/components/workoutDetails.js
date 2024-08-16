import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) => {
    const { dispatch } = useWorkoutsContext()  
    const {user} = useAuthContext()

    const handleClick = async () => {
        if (!user){
            return
        }

        const responce = await fetch('http://16.171.39.232/api/workouts/' + workout._id,{
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }

        })
        const json = await responce.json()

        if (responce.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }
    
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load: </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addsuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails;