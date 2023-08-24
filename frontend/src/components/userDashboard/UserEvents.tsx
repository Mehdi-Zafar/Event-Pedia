import { Link, useNavigate } from "react-router-dom";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { BsCalendarDate, BsPerson } from "react-icons/bs";
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai';
import {useEffect} from 'react';
import { formatDate, formatTime } from "../../utilities/Utilities";

const UserEvents = ({data,refetch}:UserEventsProps) => {
    const navigate = useNavigate()
    

  useEffect(()=>{
    refetch()
  },[])

    const handleDelete = async(id:string)=>{
        try {
            const response = await fetch(`/api/event/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        
            const data = await response.json();
            console.log('Delete request successful:', data);
            refetch()
          } catch (error) {
            console.error('Delete request failed:', error);
          }
    }

    const handleEdit = (id:string)=>{
        navigate('/update-event',{state:id})
    }
  
    return ( 
        <section className="text-amber-300 m-16 flex justify-evenly gap-x-4 gap-y-8 flex-wrap">
            {data?.events?.length > 0 ? 
            data?.events?.map((event:any)=>(
                <div className="w-80 relative bg-zinc-800 pt-2 pb-4 px-4 rounded-md shadow-xl shadow-zinc-900 duration-500 hover:-translate-y-4 group">
                    <div 
                    title="Edit"
                    onClick={()=>handleEdit(event._id)}
                    className="absolute top-0 left-0 bg-amber-300 text-zinc-800 py-1.5 px-2 rounded-tl-md rounded-br-md cursor-pointer duration-500 opacity-0 group-hover:opacity-100">
                        <AiOutlineEdit/>
                    </div>
                    <div 
                    title="Delete"
                    onClick={()=>handleDelete(event._id)}
                    className="absolute top-0 right-0 bg-amber-300 text-zinc-800 py-1.5 px-2 rounded-tr-md rounded-bl-md cursor-pointer duration-500 opacity-0 group-hover:opacity-100"><AiOutlineDelete/></div>
                    <h3 className="text-2xl text-center my-1">{event.title}</h3>
                    {/* <p className="text-lg text-center my-1">{event.description}</p> */}
                    <div className="mx-4">
                        <small className="my-3 flex gap-2 items-center"><IoLocationOutline/>{event.location}</small>
                        <small className="my-3 flex gap-2 items-center"><BsCalendarDate/>{formatDate(event.date)}</small>
                        <small className="my-3 flex gap-2 items-center"><IoTimeOutline/>{formatTime(event.time)}</small>
                        <small className="my-3 flex gap-2 items-center"><BsPerson/>{event.interested?.length} interested</small>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <Link to={`/events/${event._id}`} className="text-center rounded bg-amber-300 w-40 px-2 py-1 text-zinc-800 hover:bg-amber-400 hover:border-amber-400">View</Link>
                        {/* <button className=" text-amber-300 bg-[#333] px-2 py-1 w-28 rounded duration-200 hover:text-zinc-800 hover:bg-amber-300">Interested</button> */}
                    </div>
                </div>
            )):
            <div className="text-3xl text-center">No events!</div>
            }
        </section>
     );
}
 
export default UserEvents;


interface UserEventsProps{
    data:any,
    refetch:any
}