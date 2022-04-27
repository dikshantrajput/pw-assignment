import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Poll from './Poll';

function Polls({user}) {
  const [polls, setPolls] = useState([])
  const [pollsPer, setPollsPer] = useState([])
  useEffect(()=>{
    const fetchPolls = async()=>{
      try{
  
        const response = await axios.get('http://localhost:8001/poll/all');
        if(response?.data?.data){
          response?.data?.data.forEach(async(r)=>{
            const res = await axios.get('http://localhost:8001/poll/data/' + r._id);
            setPollsPer((prev)=>[...prev,res?.data?.data])
          })
          setPolls(response?.data?.data)
        }else{
          alert("Error")
        }
  
      }catch(err){
          alert("Error")
          console.log(err)
      }
    }
    fetchPolls()
  },[])
  return (
    <div style={{margin:"2em"}}>
      {
        polls.length === 0 && "No polls found please refresh to see new polls now!!!"
      }

      {
        polls.map((poll,index)=>{
          return <Poll poll={poll} user={user} data={pollsPer[index]}/>
        })
      }
    </div>
  )
}

export default Polls