import {Form, useLoaderData} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

export function EditTea() {
    const tea = useLoaderData();
    return (
        <>
            <Form method="post" id="contact-form">
                <p>
                    <span>Name</span>
                    <input placeholder="First" aria-label="First name"
                           type="text" name="first" defaultValue={tea.name}/>
                </p>
                <p>
                    <label>
                        <span>avatar url</span>
                        <input placeholder="https://avatorUrl.com"
                               aria-label="Avator URL"
                               type="text"
                               name="avator"
                               defaultValue={tea.name}/>
                    </label>
                    <label>
                        <span>Notes</span>
                        <textarea name="info" defaultValue={tea.info} rows={6}/>
                    </label>
                </p>
                <p>
                    <button type="submit">save</button>
                    <button type="button">cancel</button>
                </p>
            </Form>
            <p>   </p>
            <p>    </p>

            <MapContainer style={{ height: "350px" ,width:"700px"}} className="map-container"  center={[22.79153838914128, 100.97190445890742]} zoom={5} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[22.79153838914128, 100.97190445890742]}>
                    <Popup>
                        A pretty CSS3 popup.{console.log("hello")} <br/> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    )
}