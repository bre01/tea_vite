import {useLocation} from "react-router";
import {Form, Link, useActionData, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
interface IerrorResponse{
    code:string;
    reason:string;
}

export function EnterCode(){
    const {state}=useLocation();
    const [username,setUsername]=useState();
    const [contact,setContact]=useState();
    useEffect(() => {
        const {username,contact}=state;
       setUsername(username);
       setContact(contact);
    }, []);
   const errorResponse=useActionData();
   const navigate=useNavigate();
    useEffect(() => {
        if (errorResponse && errorResponse.code === 200) {
            navigate("/")
        }
        else{
            console.log("not return");
        }
    }, [errorResponse, navigate])

   //const {username,contact}=state;
   return(
       <div className="flex justify-center items-center h-screen">
       <div
           className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
               <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                   Join Us!
               </h1>
               <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                   <Form method="post" className="space-y-4 md:space-y-6" id="contact-form">
                       <div>
                           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username </label>
                           <input type="text" name="username" value={username}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  readOnly={true}/>
                           <br/>

                           <label
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact</label>
                           <input type="text" name="contact" value={contact}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  readOnly={true}/>
                           <br/>
                           <label
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Verify Code</label>

                           <input type="text" name="code"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  required/>
                           <br/>
                           <label
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set your Password</label>

                           <input type="password" name="password"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  required/>
                       </div>
                       <p>
                           <button id="sub_btn" type="submit">Submit</button>
                       </p>
                   </Form>
                   {errorResponse &&
                       <p className="show_info text-sm mb-4 w-max text-red-400">{errorResponse.reason}</p>}
                   <footer>
                       <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><Link to="/">Back to Homepage</Link>.</label>
                   </footer>
               </div>
           </div>
       </div>
       </div>
   )

}