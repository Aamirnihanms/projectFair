import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import View from '../components/View'
import Profile from "../components/Profile"
function Dashboard() {

  const [username,setusername] = useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      setusername(JSON.parse(sessionStorage.getItem("user")).username)
    }else{
      setusername("")
    }
  },[])
  return (
    <>
     <Header insideDashboard={true}/>
     <div style={{marginTop:"100px"}} className='container-fluid'>
      <div className='row mt-3'>
        <div className="col-lg-8">
          <h1>welcome <span className='text-warning'>{username?.split(" ")[0]}</span>,</h1>
          <View/>
        </div>
        <div className='col-lg-4'>
          <Profile/>
        </div>
      </div>
     </div>
    </>
  )
}

export default Dashboard