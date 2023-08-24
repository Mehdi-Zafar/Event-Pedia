import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {IoLocationOutline,IoTimeOutline} from 'react-icons/io5'
import {BsCalendarDate, BsPerson} from 'react-icons/bs'
import { useStore } from "../zustand/store";
import { formatDate, formatTime } from "../utilities/Utilities";


const RenderEvents = () => {
    const user = useStore((state:any)=>state.user)    
    const { isLoading, data,refetch } = useQuery('eventData', () =>
    fetch('/api/event').then(res =>
      res.json()
    )
  )

  if (isLoading) return 'Loading...'


  const handleInterest = (id:string)=>{
    const event = data?.events?.filter((e:any)=>e._id===id)
    const present = event[0].interested.filter((e:string)=>e===user?._id)
    console.log(present,user?._id)
    if(present.length > 0){
        event[0].interested = event[0].interested.filter((e:string)=>e!==user?._id)
    }else{
        event[0].interested.push(user?._id)
    }
    updateEvent(event[0],id)
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



    return ( 
        <section className="text-amber-300 m-16 flex justify-evenly gap-x-4 gap-y-8 flex-wrap">
            {data?.events?.length > 0 ?
            data?.events?.map((event:any)=>(
                <div className="w-80 bg-zinc-800 pt-2 pb-4 px-4 rounded-md shadow-xl shadow-zinc-900 duration-500 hover:-translate-y-4">
                    <h3 className="text-2xl text-center my-1">{event.title}</h3>
                    {/* <p className="text-lg text-center my-1">{event.description}</p> */}
                    <div className="mx-4">
                        <small className="my-3 flex gap-2 items-center"><IoLocationOutline/>{event.location}</small>
                        <small className="my-3 flex gap-2 items-center"><BsCalendarDate/>{formatDate(event.date)}</small>
                        <small className="my-3 flex gap-2 items-center"><IoTimeOutline/>{formatTime(event.time)}</small>
                        <small className="my-3 flex gap-2 items-center"><BsPerson/>{event.interested?.length} interested</small>
                    </div>
                    <div className="flex justify-evenly items-center mt-4">
                        <Link to={`/events/${event._id}`} className="text-center rounded bg-amber-300 w-32 px-2 py-1 text-zinc-800 hover:bg-amber-400 hover:border-amber-400">View</Link>
                        {event.createdBy !== user?._id &&
                        <button onClick={()=>handleInterest(event._id)} className=" text-amber-300 bg-[#333] px-2 py-1 w-32 rounded duration-200 hover:text-zinc-800 hover:bg-amber-300">{event.interested.includes(user?._id)?'Interested':'Show Interest'}</button>
                        }
                    </div>
                </div>
            ))
            :
            <div className="text-3xl text-center">No events!</div>
            }
        </section>
     );
}
 
export default RenderEvents;