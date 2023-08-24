import Hero from "../components/Hero";
import RenderEvents from "../components/RenderEvents";
import { useStore } from "../zustand/store";

const Home = () => {
    const user = useStore((state:any)=>state.user)
    console.log(user)
    return ( 
        <>
            <Hero/>
            {/* <div>
                <h2 className="text-amber-300 text-4xl text-center">Events</h2>
                <div className="h-1 w-20 rounded-lg bg-amber-300 mt-4 text-center mx-auto"></div>
            </div>
            <RenderEvents/> */}
        </>
     );
}
 
export default Home;
