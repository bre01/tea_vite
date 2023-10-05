import {useActionData, useSubmit} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export async function signUp({request}){
    const formData=await request.formData();
    const body=await Object.fromEntries(formData);
    console.log(body);
    const contactType=validateInput(body.contact);
    if(contactType=='Not Qualified'){
        console.log("Not qualified")
        return new Response(JSON.stringify({code:404,reason:"Please enter a email or phone number"}),
        {status:404,statusText:"network",headers: new Headers({
            'Content-Type': 'application/json', // Adjust the content type as needed
        })}
        );
    }
    body.type=contactType;//add type info to http body
    const response=await fetch("api/verify",{
        headers:{'Accept':'application/json','Content-type':'application/json'},
        method:'POST',
        body:JSON.stringify(body)});
    console.log(response);

    if(response.ok) {
        console.log("connection successful")
       return response;
        //the code can be other than 200;
    }
    else{
        console.log("bad network")
        return new Response(JSON.stringify({code:404,reason:"network problem"}),
            {status:404,statusText:"network",headers: new Headers({
                    'Content-Type': 'application/json', // Adjust the content type as needed
                })});
    }




}

function validateInput(input) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return 'EMAIL';
    if (emailRegex.test(input)) {
        return 'Email';
    } else if (phoneRegex.test(input)) {
        return 'Phone Number';
    } else {
        return 'Not Qualified';
    }







}