import {redirect} from "react-router-dom";

export async function  EnterCodeAction({request}){
    const formData=await request.formData();
    const body=await Object.fromEntries(formData);
    console.log(body);
    const response=await fetch("api/signup",
    {headers:{'Accept':'application/json','Content-type':'application/json'},
        method:'POST',
        body:JSON.stringify(body)});
    console.log(response);
    if(response.ok){
            return response;
    }
    else{
        console.log("network,make fake reponse")
        return new Response(JSON.stringify({code:404,reason:"network problem"}),
            {status:404,statusText:"network",headers: new Headers({
                    'Content-Type': 'application/json', // Adjust the content type as needed
                })});
    }
}
