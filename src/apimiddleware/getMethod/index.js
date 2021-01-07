import { baseURL } from "../url"

const GET_METHOD =async (url)=>{
  console.log(baseURL+url, 'getDta')
  try{
      let response = await fetch(
            baseURL + `${url}`,
            {
              method : 'GET'
            }
      )
      let res;
      console.log("respone" , response)
      if(response.status == 200){
          res = await response.json();
          return res
      }
      
  } 
  catch(error){
    console.error(error)
  }
}

export default GET_METHOD;