import { Link } from "react-router-dom";
import {FaRegUserCircle} from 'react-icons/fa'
import {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const initialValue = {username:'',email:'',password:'',confirmPassword:''}

const SignUpForm = () => {
    const [values,setValues] = useState(initialValue)
    const navigate = useNavigate()
    const notifySuccess = () => toast.success('Sign Up Successfull!', {
                                        position: "top-center",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "dark",
                                        });
    const notifyError = () => toast.error('Sign Up Unsuccessfull!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

    const handleValues = (e:any)=>{
        setValues(prev=>{return {...prev,[e.target.name]:e.target.value}})
    }

    const inputs = [
        {label:'Username',type:'text',name:'username',value:values.username},
        {label:'Email',type:'email',name:'email',value:values.email},
        {label:'Password',type:'password',name:'password',value:values.password},
        {label:'Confirm Password',type:'password',name:'confirmPassword',value:values.confirmPassword},
    ]

    const handleSignUpForm = (e:any)=>{
        e.preventDefault();
        const {confirmPassword,...other} = values
        if(values.password === values.confirmPassword){
            fetch('/api/user/sign-up', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(other)
              })
                .then(response => response.json())
                .then(() => {
                  notifySuccess()
                  setValues(initialValue)
                  navigate('/login')
                })
                .catch(error => {
                  console.error('Error during registration:', error);
                  notifyError()
                });
        }
    }

    return ( 
        <section className="text-amber-300 my-8">
            <div className="flex justify-center text-5xl"><FaRegUserCircle/></div>
            <h2 className="text-4xl text-center mt-4">Sign Up</h2>
            <form className="mt-4" onSubmit={handleSignUpForm} autoComplete="off">
                {inputs?.map((input)=>(
                    <div className="my-4">
                        <label className="my-1 text-lg">{input.label}</label><br/>
                        <input type={input.type} name={input.name} value={input.value} required onChange={(e)=>handleValues(e)} className="bg-zinc-800 my-2 w-80 py-2 px-4 rounded-full outline-none focus:bg-zinc-900"/>
                    </div>
                ))}
                <button className="w-80 mt-4 bg-amber-300 text-zinc-800 py-2 rounded-full text-xl font-semibold">Sign Up</button>
            </form>
            <div className="mt-5 text-center">
                <small className="text-center">Already have an account? <Link to="/login" className="underline">Login</Link></small>
            </div>
            <div className="mt-4 text-center">
                <small><Link to="/" className="underline">Back to Home</Link></small>
            </div>
            <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
        </section>
     );
}
 
export default SignUpForm;