import React, {useEffect, useRef, useState} from 'react'
import {redirect, Form, Link, useRouteLoaderData} from 'react-router-dom'
import localforage from "localforage";
import {useActionData} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {isRouteErrorResponse} from "react-router";

export default function SignInPage() {
    const navigate = useNavigate();
    const errorResponse=useActionData();
    console.log("hello");
    useEffect(() => {
        if (errorResponse?.code==200) {
            console.log(errorResponse);
            const { userid, code } = errorResponse;
            localforage.setItem('userid', userid);
            localforage.setItem('code', code);
            navigate('/', { state: { loggedIn: true, userid, code } });
        }
    }, [errorResponse, navigate])







    return (
        <div className="flex justify-center items-center h-screen">
            <div
                className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <Form method="post" className="space-y-4 md:space-y-6" id="contact-form">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username
                                    or
                                    email address</label><br/>
                                <input type="text" name="username"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required/>
                            </div>
                            <p>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>

                                <br/>
                                <input type="password" name="password"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required/>
                                <br/>
                                <Link to="/forget-password"><label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Forget
                                    password?</label></Link>
                            </p>
                            <p>
                                <button id="sub_btn" type="submit">Login</button>
                            </p>
                        </Form>
                        {errorResponse &&
                            <p className="show_info text-sm mb-4 w-max text-red-400">{errorResponse.reason}</p>}
                        <footer>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                                time? <Link to="/signup">Create an account</Link>.</label>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><Link
                                to="/">Back to Homepage</Link>.</label>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}
