import axios from "axios"


const commonApi = async (httpMethod,url,reqbody,reqHeader)=>{
   const reqConfig ={
    method:httpMethod,
    url,
    data:reqbody,
    headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
   }
   return await axios(reqConfig).then(res=>{
    return res
   }).catch(err=>{
    return err
   })
}

export default commonApi