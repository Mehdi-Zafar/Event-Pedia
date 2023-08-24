import { useNavigate } from "react-router-dom";
import { useStore } from "../../zustand/store";

const DashboardHeader = () => {
    const user = useStore((state:any)=>state.user)
    const setUser = useStore((state:any)=>state.setUser)
    const navigate = useNavigate()

    const handleLogout= ()=>{
        setUser(null)
        navigate('/')
    }

    return ( 
        <section className="text-amber-300 flex justify-between items-center my-8">
            <h3 className="text-2xl">Hello, {user?.username}</h3>
            <button onClick={handleLogout} className="underline text-xl">Logout</button>
        </section>
     );
}
 
export default DashboardHeader;