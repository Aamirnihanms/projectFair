// register called by auth

import commonApi from "./commonApi"
import serverurl from "./serverUrl"

export const registerApi = async (reqBody)=>{
return await commonApi("POST",`${serverurl}/register`,reqBody)
}

// login called by Auth
export const loginAPI = async(reqBody)=>{
    return await commonApi ("POST",`${serverurl}/login`,reqBody)
}

// add project
export const addprojectapi = async (reqBody,reqHeader)=>{
   return await commonApi("POST",`${serverurl}/add-project`,reqBody,reqHeader)
}

// homeprojectsapi

export const homeprojectsapi =async ()=>{
  return await commonApi("GET",`${serverurl}/home-projects`,"")
}

// allprojectsapi
export const allprojectsapi = async (searchkey,reqHeader)=>{
  return await commonApi("GET",`${serverurl}/all-projects?search=${searchkey}`,"",reqHeader)
}

// userprojectsapi
export const userprojectsapi = async (reqHeader)=>{
  return await commonApi("GET",`${serverurl}/user-projects`,"",reqHeader)
}

// delete project
export const deleteprojectapi = async (pid,reqHeader)=>{
  return await commonApi("DELETE",`${serverurl}/${pid}/remove-project`,{},reqHeader)
}

// edit project
export const editprojectapi = async (pid,reqBody,reqHeader)=>{
  return await commonApi("PUT",`${serverurl}/${pid}/edit-project`,reqBody,reqHeader)
}


// edit profile (user)
export const edituserapi = async (reqBody, reqHeader) => { return await commonApi("PUT", `${serverurl}/user/edit`, reqBody, reqHeader); };