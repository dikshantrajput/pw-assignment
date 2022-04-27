import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Poll({poll,user,data}) {
    let navigate = useNavigate()
    const handleOptionClick = async (id,poll_id)=>{
        if(user === undefined || !user){
            alert("Please login first")
            navigate('/sign-in')
            return
        }
        
        try{
            let name = user.name
            let data = {id,name,poll_id}
            const response = await axios.post('http://localhost:8001/poll/vote',data);
            
            if(response?.data?.data === true){
                const res = await axios.get('http://localhost:8001/poll/data/' + poll_id);
                alert("Voted success")
                window.location.reload()
            }else{
              alert(response?.data?.data)
            }
        }catch(err){
            alert("Error")
            console.log(err)
        }
    }
  return (
    <div style={{padding:"1em"}}>
        <h4>{poll.title}</h4>
        {
            poll.options.map((option)=>{
                let per = data?.find((d)=>d.id === option._id)?.per?.toFixed(2)
                return <li style={{cursor:"pointer",marginBottom:"0.4em"}} onClick={()=>handleOptionClick(option._id,poll._id)}>{option?.body} ({per} %)</li>
            })
        }
    </div>
  )
}

export default Poll