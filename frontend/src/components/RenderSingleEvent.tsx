import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {IoLocationOutline,IoTimeOutline} from 'react-icons/io5'
import {BsCalendarDate, BsPerson} from 'react-icons/bs'
import { formatDate, formatTime } from "../utilities/Utilities";
import { useStore } from "../zustand/store";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const RenderSingleEvent = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const user = useStore((state:any)=>state.user)
    const { isLoading, data,refetch } = useQuery(`singleEventData ${id}`, () =>
    fetch(`/api/event/${id}`).then(res =>
      res.json()
    )
  )

  console.log(data)

  if (isLoading) return 'Loading...'

  const handleInterest = (id:string)=>{
    const event = data?.event
    const present = event.interested.filter((e:string)=>e===user?._id)
    console.log(present,user?._id)
    if(present.length > 0){
        event.interested = event.interested.filter((e:string)=>e!==user?._id)
    }else{
        event.interested.push(user?._id)
    }
    updateEvent(event,id)
  }

  const updateEvent = (event:any,id:string)=>{
        fetch(`/api/event/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
            })
            .then(response => response.json())
            .then((data) => {
                if(data.event){
                    console.log('success')
                    console.log(data.event)
                    refetch()
                }else{
                    console.log('error')
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
            });
    }

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
            navigate('/user-dashboard')
          } catch (error) {
            console.error('Delete request failed:', error);
          }
    }

    const handleEdit = (id:string)=>{
        navigate('/update-event',{state:id})
    }

    return ( 
        <section className="text-amber-300 mx-16 my-8 relative">
            {data?.event?.createdBy === user?._id &&
            <>
            <div 
            title="Edit"
            onClick={()=>handleEdit(data?.event?._id)}
            className="absolute top-0 right-10 bg-amber-300 text-zinc-800 py-1.5 px-2 rounded-tl-md rounded-br-md cursor-pointer">
                <AiOutlineEdit/>
            </div>
            <div 
            title="Delete"
            onClick={()=>handleDelete(data?.event?._id)}
            className="absolute top-0 right-0 bg-amber-300 text-zinc-800 py-1.5 px-2 rounded-tr-md rounded-bl-md cursor-pointer"><AiOutlineDelete/></div>
            </>
            }
            <h2 className="text-center text-3xl my-4">{data?.event?.title}</h2>
            <p className="text-center text-lg my-8">{data?.event?.description}</p>
            <div className="grid grid-cols-4 mt-12">
                <div className="col-start-2 justify-self-center flex items-center gap-2 my-4">
                    <IoLocationOutline/>{data?.event?.location}
                </div>
                <div className="col-start-3 justify-self-center flex items-center gap-2 my-4">
                    <BsCalendarDate/>{formatDate(data?.event?.date)}
                </div>
                <div className="col-start-2 justify-self-center flex items-center gap-2 my-4">
                    <IoTimeOutline/>{formatTime(data?.event?.time)}
                </div>
                <div className="col-start-3 justify-self-center flex items-center gap-2 my-4">
                    <BsPerson/>{data?.event?.interested?.length} interested
                </div>
            </div>
            {data?.event?.createdBy !== user?._id &&
            <div className="flex justify-center my-4">
                <button onClick={()=>handleInterest(data?.event?._id)} className=" text-amber-300 bg-[#333] px-2 py-1 w-32 rounded duration-200 hover:text-zinc-800 hover:bg-amber-300">{data?.event?.interested.includes(user?._id)?'Interested':'Show Interest'}</button>
            </div>
            }
        </section>
     );
}
 
export default RenderSingleEvent;