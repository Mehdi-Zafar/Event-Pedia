import { Link } from "react-router-dom";
import { useStore } from "../zustand/store";
import {FaRegUserCircle} from 'react-icons/fa'

const Navbar = () => {
  const user = useStore((state:any)=>state.user)

    return ( 
        <nav className="w-full absolute top-0 flex justify-between items-center text-white py-5 z-10">
          <div className="text-2xl ml-12 text-amber-300"><Link to="/" className="cursor-pointer w-full">Event Pedia</Link></div>
          <div className="mr-12">
            <ul className="text-lg flex items-center gap-6 text-amber-300">
              <Link to="/" className="cursor-pointer"><li>HOME</li></Link>
              <Link to="/events" className="cursor-pointer"><li>EVENTS</li></Link>
              <Link to="/about" className="cursor-pointer"><li>ABOUT</li></Link>
              {!user ?
              <Link to="/login" className="border-2 border-amber-300 text-amber-300 w-24 px-2 py-1 text-center">LOGIN</Link>
              :
              <Link to="/user-dashboard" className="py-1 px-3 rounded-xl border-2 border-amber-300 flex items-center gap-2"><FaRegUserCircle/>{user?.username}</Link>
              }
            </ul>
          </div>
        </nav>
     );
}
 
export default Navbar;