import {useLoaderData} from "react-router";
import {Form} from "react-router-dom";

export function Tea() {
    const tea = useLoaderData();
    console.log(tea);
    if(!tea){
        return(<div>Loading tea information...</div>);
    }

    else return (
        <div id="contact">
            <div>
                {<img key={tea.id} src={"https://fakeimg.pl/300/?text=hello" || null}/>}

                {/*<p>there should be image</p>*/}
            </div>
            <div>
                <h1>
                    {tea.id || tea.name ?
                        (<>
                            {tea.id} {tea.name}
                        </>) :
                        (
                            <i>No tea</i>
                        )
                    }{" "}
                </h1>
                {tea.age && (
                    <p>
                        <a target="_blank"
                           href={`https://x.com/${tea.age}`}
                        >
                            {tea.age}
                        </a>
                    </p>
                )}
                {tea.info && (
                    <p>{tea.info}</p>
                )}
                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form method="post" action="destroy" onSubmit={(event) => {
                        if (!confirm("please confirm you wanan delete this record")) {
                            event.preventDefault();
                        }
                    }}>
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>

    )
}