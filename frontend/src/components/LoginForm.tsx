import { Link } from "react-router-dom";
import {FaRegUserCircle} from 'react-icons/fa'
import {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useStore } from "../zustand/store";

const initialValue = {email:'',password:''}

const LoginForm = () => {
    const [values,setValues] = useState(initialValue)
    const navigate = useNavigate()
    const setUser = useStore((state:any)=>state.setUser)
    const notifySuccess = () => {
        toast.success('Login Successfull!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })}
    const notifyError = () => {
        toast.error('Login Unsuccessfull!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })}

    const handleValues = (e:any)=>{
        setValues(prev=>{return {...prev,[e.target.name]:e.target.value}})
    }

    const inputs = [{label:'Email',type:'email',name:'email',value:values.email},{label:'Password',type:'password',name:'password',value:values.password}]

    const handleLoginForm = (e:any)=>{
        e.preventDefault();
        fetch('/api/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          })
            .then(response => response.json())
            .then((data) => {
                if(data?.userDetails){
                    loginSuccess(data)
                }else{
                    notifyError()
                }
            })
            .catch(error => {
              console.error('Error during registration:', error);
            });
    }

    const loginSuccess = (data:any)=>{
        notifySuccess()
        setValues(initialValue)
        sessionStorage.setItem("EVENT_USER", data.userDetails);
        setUser(data.userDetails)
        setTimeout(()=>{
            navigate('/user-dashboard')
        },1500)
    }

    return ( 
        <section className="text-amber-300 my-8">
            <div className="flex justify-center text-5xl"><FaRegUserCircle/></div>
            <h2 className="text-4xl text-center mt-4">Login</h2>
            <form className="mt-4" onSubmit={handleLoginForm} autoComplete="off">
                {inputs?.map((input)=>(
                    <div className="my-4">
                        <label className="my-1 text-lg">{input.label}</label><br/>
                        <input type={input.type} name={input.name} value={input.value} onChange={(e)=>handleValues(e)} className="bg-zinc-800 my-2 w-80 py-2 px-4 rounded-full outline-none focus:bg-zinc-900"/>
                    </div>
                ))}
                <button className="w-80 mt-4 bg-amber-300 text-zinc-800 py-2 rounded-full text-xl font-semibold">Login</button>
            </form>
            <div className="mt-5 text-center">
                <small className="text-center">Create a new account? <Link to="/sign-up" className="underline">Sign Up</Link></small>
            </div>
            <div className="mt-4 text-center">
                <small><Link to="/" className="underline">Back to Home</Link></small>
            </div>
            <ToastContainer/>
        </section>
     );
}
 
export default LoginForm;