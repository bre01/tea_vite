import {redirect} from "react-router-dom";
import localforage from "localforage";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import canPlayThrough = Simulate.canPlayThrough;


export async function Login({request,params}){
    const formData=await request.formData();
    let body=Object.fromEntries(formData);
    let copybody=body;
    body={identifier:copybody.username,password:copybody.password}
    console.log(body);

    const response = await fetch("/api/signin", {
        headers: { 'Accept': 'application/json', 'Content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(body)
    });
    console.log(response);
    console.log()

    if (response.ok ) {
        //return redirect("/");
        return response;

    }
     else {
        // Handle other errors
        console.log("Error: " + response.status);
        console.log("get!")
        return new Response(JSON.stringify({code:404,reason:"network problem"}),
            {status:404,statusText:"network",headers: new Headers({
                    'Content-Type': 'application/json', // Adjust the content type as needed
                })});
    }


}