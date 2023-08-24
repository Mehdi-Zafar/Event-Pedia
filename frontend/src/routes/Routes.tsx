import { createBrowserRouter,createRoutesFromElements,Route,Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import About from "../pages/About";
import SingleEvent from "../pages/SingleEvent";
import Events from "../pages/Events";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import UserDashboard from "../pages/UserDashboard";
import UpdateEvent from "../pages/UpdateEvent";

const Layout = ()=>{
    return(
        <>
        <Navbar/>
        <Outlet/>
        </>
    )
}

export const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="events" element={<Events/>}/>
        <Route path="events/:id" element={<SingleEvent/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="/user-dashboard" element={<UserDashboard/>}/>
        <Route path="/update-event" element={<UpdateEvent/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      </>
    )
  );
