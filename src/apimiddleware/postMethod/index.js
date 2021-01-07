
import { baseURL } from "../url";
const POST_METHOD = async (payload, url , token)=> {
    console.log(payload,baseURL + `${url}` , 'yes')
    try {
        let response =await  fetch(
            baseURL + `${url}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            })
            let res;
            console.log("respone" , response)
            if(response.status == 200){
                res = await response.json();
               alert("Successfully Added")
                return res
            }else if(response.status == 401){
                res = await response.json();
                console.log("respone" , res)
              
            }else if(response.status == 404){
                res = await response.json();
                console.log("respone" , res)
              
            }else if(response.status == 400){
                res = await response.json();
                console.log("400" , res)
                alert(res.details[0].message)
            }
            else if(response.status == 202){
                res = await response.json();
                console.log("400" , res)
                alert("Already Exists")
            }
    }
    catch (error) {
        console.log("err" , error)
        alert(error)
        // console.error(error);
    }
}


export default POST_METHOD;