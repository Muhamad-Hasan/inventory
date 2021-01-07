
import { baseURL } from "../url";

export  const DELETE_METHOD = async(url , payload , token) =>{
    console.log(url,payload , 'yes')
    try {
        let response = await fetch(
            baseURL + `${url}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            })
            let res;
            console.log("respone" , response)
            if(response.status == 200){
                res = await response.json();
                return res
            }
      
    }
    catch (error) {
        console.error(error);
    }
}

