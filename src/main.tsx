import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {createRoutesFromElements, Route, RouterProvider, Routes} from "react-router";
import {BrowserRouter, createBrowserRouter} from "react-router-dom";
import Root from "./Root.tsx"
import User from "./User.tsx";
import Shop from "./Shop.tsx"
import Home from "./Home.tsx";
import {allTeasLoader as teasLoader, newStoreTeas} from "./Function/Tea.ts";
import {singleTeaLoader as teaLoader} from "./Function/Tea.ts"
import {Tea} from "./Componets/Tea.tsx";
import {Login, Login as LoginAction} from "./Action/Login.ts";
import SignInPage from "./Componets/SignIn.tsx";
import {teas as teasAction} from "./Action/Teas.ts";
import {ErrorPage} from "./Componets/Error.tsx";
import {Index} from "./Componets/Index.tsx"
import {EditTea} from "./Componets/Edit.tsx";
import {destroyAction} from "./Action/Destroy.ts";
import {editAction} from "./Action/Edit.ts";
import {teaAction} from "./Action/Tea.ts"
import {StoreTeas} from "./Function/Tea.ts";
import {allTeasLoader} from "./Function/Tea.ts";
import localforage from "localforage";
import SignUp from "./Componets/SignUp.tsx";
import {signUp as SignUpAction} from "./Action/SignUp.ts";
import {EnterCode} from "./Componets/EnterCode.tsx";
import {Agreement} from "./Componets/Agreement.tsx";
import {EnterCodeAction} from "./Action/EnterCode.ts";
import {Teas} from "./Componets/Teas.tsx";
import {SignOut} from "./Componets/SignOut.tsx";
/*let router = createBrowserRouter(
    [{
        path: "/", element: <Root></Root>, loader: TeasLoader, children: [
            {path: "teas/:teaId", element: <Tea></Tea>, loader: TeaLoader},

        ]

    },
        {path: "/login", element: <Login></Login>, action: LoginAction}
    ]
)*/
await StoreTeas();
let router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root/>} loader={teasLoader} action={teasAction} errorElement={<ErrorPage/>}>
                <Route errorElement={<ErrorPage/>}>
                    <Route index element={<Teas/>} loader={teasLoader} action={teaAction}/>
                    <Route path="teas/:teaId" element={<Tea/>} loader={teaLoader} action={teaAction}/>
                    <Route path="teas/:teaId/edit" element={<EditTea/>} loader={teaLoader} action={editAction}/>
                    <Route path="teas/:teaId/destroy" action={destroyAction}/>
                    <Route path="/signin" element={<SignInPage/>} action={LoginAction}/>
                    <Route path="/Signup" element={<SignUp/>} action={SignUpAction}/>
                    <Route path="/Entercode" element={<EnterCode/>} action={EnterCodeAction}/>
                    <Route path="/agreement" element={<Agreement/>}/>
                    <Route path="/signout" element={<SignOut/>}/>
                </Route>

            </Route>
            <Route path="/signin" element={<SignInPage/>} action={LoginAction}/>

        </>
    )
);


// ! is a non null assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)



