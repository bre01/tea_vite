import {faker} from '@faker-js/faker';
import {useState} from "react";
import {useLoaderData, useLocation} from "react-router";
import {Link} from 'react-router-dom';

export function Teas() {
    const {state}=useLocation()
    const avator = faker.image.avatar()
    let {teas, q} = useLoaderData()
    const itemsPerPage=5;
    const totalItems=teas.length;
    const[currentPage,setCurrentPage] =useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    teas=teas.slice(startIndex,endIndex);


    // Function to change the current page
    const showPage = (page) => {
        setCurrentPage(page);
    };
    console.log(avator)
    return (
        <div>
            {teas.length ? (
                <div className="">
                    {teas.map((tea) => {

                            return (
                                <>
                                    <div key={tea.id} className="hero min-h-screen" style={{backgroundImage: `url(${tea.avatar})`}}>
                                        <div className="hero-overlay bg-opacity-60"></div>
                                        <div className="hero-content text-center text-neutral-content">
                                            <div className="max-w-md">
                                                <h1 className="mb-5 text-5xl font-bold">{tea.name}</h1>
                                                <p className="mb-5">{tea.info}</p>
                                                <button className="btn btn-outline btn-info mr-4">Learn more</button>
                                                <button className="btn btn-outline btn-success mr-5">Buy</button>
                                                <button className="btn btn-outline btn-success glass">Add to cart</button>
                                            </div>
                                        </div>
                                    </div>


                                </>
                            )
                        }
                    )}
                </div>) : <a></a>}
            <div className="join flex justify-center items-center">
                <div>
                    {[...Array(Math.ceil(totalItems / itemsPerPage)).keys()].map((page) => (
                        <button
                            key={page}
                            className={`join-item btn ${currentPage === page + 1 ? 'active' : ''}`}
                            onClick={() => showPage(page + 1)}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    )
}