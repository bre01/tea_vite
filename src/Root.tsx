import {Outlet, useLoaderData, useLocation} from "react-router";
import {allTeasLoader, getTeas, StoreTeas} from "./Function/Tea.ts";
import {Form, Link, useSubmit} from "react-router-dom";
import {useEffect, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {faker} from "@faker-js/faker";

export default function Root() {
    const {state} = useLocation();
    const {q, teas} = useLoaderData()
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    }
    useEffect(() => {
        //(document.getElementById("q"))!.value = q;

    }, [q]);
    useEffect(() => {
        if (state) {
            setIsLoggedIn(state.loggedIn);
        }
    }, [state]);
    const image = faker.image.avatar();
    const userAvatar = "https://fakeimg.pl/300/?text=hello";
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const submit = useSubmit();
    return (
        <div>
            <header className="navbar bg-base-100 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h8m-8 6h16"/>
                            </svg>
                        </label>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">TeaX</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 z-[1]">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                        <li tabIndex={0}>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>

                        </li>
                    </ul>
                </div>
                <div className=" gap-2">
                    <Form className="form-control">
                            <input id="q" name="q" type="text" onSubmit={(event) => {
                                submit(event.currentTarget.form);
                            }} placeholder="Search" className="input input-bordered w-24 md:w-auto"/>
                        </Form>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={image}/>
                        </div>
                    </label>
                    <ul tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        {isLoggedIn ? (
                                <>
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <Link to="/signout">
                                        <li><a>Logout</a></li>
                                    </Link></>) :
                            (
                                <Link to="/signin">
                                    <li><a>login in </a></li>
                                </Link>
                            )}
                    </ul>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </label>
                    <div tabIndex={0}
                         className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </button>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                </div>
        </div>
</header>


    <Outlet></Outlet>


    <footer className="footer p-10 bg-base-200 text-base-content">
        <nav>
            <header className="footer-title">Services</header>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
            <header className="footer-title">Company</header>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
            <header className="footer-title">Legal</header>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
            <header className="footer-title">Newsletter</header>
            <fieldset className="form-control w-80">
                <label className="label">
                    <span className="label-text">Enter your email address</span>
                </label>
                <div className="relative">
                    <input type="text" placeholder="username@site.com"
                           className="input input-bordered w-full pr-16"/>
                    <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe
                    </button>
                </div>
            </fieldset>
        </form>
    </footer>
</div>
)
}

