import { useEffect, useState } from "react";

import WorkoutDetails from "../components/workoutDetails.js";

const Home = () => {
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fethchWorkouts = async () => {
            const response = await fetch('http://localhost:4500/api/workouts')
            const json = await response.json()
            // console.log(json)

            if (response.ok) {
                setWorkouts(json.json)
            }
        }
        fethchWorkouts()
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                <h4>Home</h4>
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout.id} workout={workout} />
                ))}
            </div>
        </div>
      )
}    

export default Home;



