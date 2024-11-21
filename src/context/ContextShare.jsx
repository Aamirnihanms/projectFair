import React from 'react'
import { createContext,useState } from 'react'
export const addresponsecontext = createContext()
export const editresponsecontext = createContext()

const ContextShare = ({children}) => {
    const [addresponse,setaddresponse]=useState("")
    const [editresponse,seteditresponse]=useState("")
    return (
      <addresponsecontext.Provider value={{addresponse,setaddresponse}}>
         <editresponsecontext.Provider value={{editresponse,seteditresponse}}>
           {children}
           </editresponsecontext.Provider>
      </addresponsecontext.Provider>
    )
  }
  
  export default ContextShare