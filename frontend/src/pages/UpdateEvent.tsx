import UpdateEventForm from "../components/userDashboard/updateEventForm";
import { useLocation } from "react-router-dom";

const UpdateEvent = () => {
    const {state} = useLocation()
    console.log(state)
    return ( 
        <main>
            <UpdateEventForm id={state}/>
        </main>
     );
}
 
export default UpdateEvent;