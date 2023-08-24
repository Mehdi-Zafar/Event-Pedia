import { useQuery } from "react-query";
import CreateEvent from "./CreateEvent";
import UserEvents from "./UserEvents";
import { useStore } from "../../zustand/store";

const DashboardView = () => {
    const user = useStore((state:any)=>state.user)
    const { data,refetch } = useQuery('userEventData', () =>
        fetch(`/api/event/user/${user?._id}`).then(res =>
        res.json()
        )
    )
    
    return ( 
        <section className='text-amber-300'>
            <div className="my-8">
                <h2 className="text-4xl text-center">Your Events</h2>
                <div className="h-1 w-20 rounded-lg bg-amber-300 mt-4 text-center mx-auto"></div>
            </div>
            <UserEvents data={data} refetch={refetch}/>
            <CreateEvent refetch={refetch}/>
        </section>
     );
}
 
export default DashboardView;