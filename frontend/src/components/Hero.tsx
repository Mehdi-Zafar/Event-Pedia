import { Link } from "react-router-dom";

const Hero = () => {
    return ( 
        <div className="h-screen hero flex justify-center items-center">
          <div className="text-center text-amber-300">
            <h3 className="text-5xl my-6">The encyclopedia for events!</h3>
            <p className="text-xl my-6">View and Create events that bring us close together.</p>
            <div className="text-lg flex gap-8 justify-center my-4 font-semibold">
              <Link to="/about" className="text-center border-2 border-amber-300 bg-amber-300 w-32 px-4 py-2 text-zinc-800 hover:bg-amber-400 hover:border-amber-400">ABOUT</Link>
              <Link to="/contact" className="text-center border-2 border-amber-300 text-amber-300 w-32 px-4 py-2 duration-200 hover:text-zinc-800 hover:bg-amber-300">CONTACT</Link>
            </div>
          </div>
        </div>
     );
}
 
export default Hero;