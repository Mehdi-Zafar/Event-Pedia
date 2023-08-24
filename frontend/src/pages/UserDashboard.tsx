import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/userDashboard/DashboardHeader";
import DashboardView from "../components/userDashboard/DashboardView";
import { useStore } from "../zustand/store";
import {useEffect} from 'react'

const UserDashboard = () => {
    const user = useStore((state:any)=>state.user)
    const navigate = useNavigate()

    console.log(user)
    useEffect(() => {
      if(!user){
        navigate('/')
      }
    }, [])
    
    return ( 
        <main className="mx-24 my-32">
            <DashboardHeader/>
            <DashboardView/>
        </main>
     );
}
 
export default UserDashboard;