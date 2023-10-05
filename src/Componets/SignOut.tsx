import {Link} from "react-router-dom";
import localforage from "localforage";

export function SignOut(){
    localforage.setItem("userid",null);
    localforage.setItem("code",null);

    return(
        <>
            <div className="alert ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="justify-center">You have successfully signed
                    <br/>You can <Link to="/Signin" >
                <a className="link">sign in</a></Link> again</span>
            </div>
            </>
    )

}