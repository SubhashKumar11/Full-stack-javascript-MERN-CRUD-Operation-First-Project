import React, { createContext } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
export const adddata = createContext("")
export const updatedata = createContext("")
const ConetextProvider = ({children}) => {
    const [udata,setUdata] = useState("")
    const [updata,setUpdata] = useState("")
  return (
    <>
     <adddata.Provider value={{udata,setUdata}}>
      <updatedata.Provider value={{updata,setUpdata}}>
      {children}
      </updatedata.Provider>
        </adddata.Provider> 
    </>
  )
}

export default ConetextProvider
