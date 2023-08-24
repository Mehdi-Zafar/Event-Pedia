import {useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useStore } from '../../zustand/store';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const initialValue = {title:'',description:'',location:'',date:'',time:''}

const UpdateEventForm = ({id}:UpdateEventFormProps) => {
    const [values,setValues] = useState(initialValue)
    // const user = useStore((state:any)=>state.user)
    const navigate = useNavigate()

    const { data } = useQuery(`singleEventData ${id}`, () =>
    fetch(`/api/event/${id}`).then(res =>
      res.json()
    ))

    console.log(data,id)

    useEffect(()=>{
        setValues(data?.event)
    },[data])
  

    const notifySuccess = () => toast.success('Event updated successfully!', {
                                        position: "top-center",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "dark",
                                        });
    const notifyError = () => toast.error('Event update unsuccessful', {
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
        {label:'Title',type:'text',name:'title',value:values.title},
        {label:'Description',type:'text',name:'description',value:values.description,multiline:true},
        {label:'Location',type:'text',name:'location',value:values.location},
        {label:'Date',type:'date',name:'date',value:values.date},
        {label:'Time',type:'time',name:'time',value:values.time},
    ]

    const handleUpdateForm = (e:any)=>{
        const event = {...values}
        e.preventDefault();
        fetch(`/api/event/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                if(data.event){
                    notifySuccess()
                    setValues(initialValue)
                    setTimeout(()=>{
                        navigate('/user-dashboard')
                    },1000)
                }else{
                    notifyError()
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
            });
    }
    return ( 
        <section className='text-amber-300 mt-32 mb-16'>
            <div className="my-8">
                <h2 className="text-4xl text-center">Update Event</h2>
                <div className="h-1 w-20 rounded-lg bg-amber-300 mt-4 text-center mx-auto"></div>
            </div>
            <div className='flex justify-center'>
                <form className="mt-4" onSubmit={handleUpdateForm} autoComplete="off">
                    {inputs?.map((input)=>(
                        <div className="my-4">
                            <label className="my-1 text-lg text-start">{input.label}</label><br/>
                            {!input.multiline ?
                            <input type={input.type} name={input.name} value={input.value} required onChange={(e)=>handleValues(e)} className="bg-zinc-800 my-2 w-80 py-2 px-4 rounded-full outline-none focus:bg-zinc-900"/>
                            :
                            <textarea name={input.name} value={input.value} required onChange={(e)=>handleValues(e)} className="bg-zinc-800 my-2 w-80 py-3 px-4 rounded outline-none focus:bg-zinc-900"/>
                            }
                        </div>
                    ))}
                    <button className="w-80 mt-4 bg-amber-300 text-zinc-800 py-2 rounded-full text-xl font-semibold">Update</button>
                </form>
            </div>
            <ToastContainer/>
        </section>
     );
}
 
export default UpdateEventForm;


interface UpdateEventFormProps{
    id:string
}