import {useLoaderData} from "react-router";
import {Form} from "react-router-dom";
import {matchSorter} from "match-sorter";
import sortBy from "sort-by";
import localforage from "localforage";
import {unstable_renderSubtreeIntoContainer} from "react-dom";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;
import {createApi} from "unsplash-js";

interface Tea {
    id: string;
    name: string;
    age: string;
    fromWhere: string;
    info: string;
    avatar?:string
}
export async function allTeasLoader({request}){
    const url = new URL(request.url);
    const q=url.searchParams.get("q");
    const teas=await getTeas(q);
    console.log(teas);
    return {q,teas};
}

export async function loader({request}) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    const teas = await getTeas(q);
    return {teas};
}
export async function StoreTeas(){
    //in real world applications ,we should only request a little part of the
    //teas, but since we have small dataset,I guess request all data and
    //store all the data in local is a good idea
    let teas:never[]=await localforage.getItem("teas");
    let photos=await localforage.getItem("result1");
    console.log(photos);

    if(teas===null || teas.length===0) {

        const response = fetch("https://jsonplaceholder.typicode.com/posts/")
        const res = (await response).json();
        const teas = (await res).map(item => {
            return {id: item.id, name: item.title, fromWhere: item.userId, info: item.body};
        })
        console.log(teas);
        await set(teas);
    }
    else{
        console.log("use local file ")
    }
}
export async function newStoreTeas(){

    const unsplash = createApi({ accessKey: 'z0znd8BcWb1rS8mANIOE9pHu4kGv1d0PDIWuz7nYMaE' });

// non-feed example
        unsplash.search.getPhotos({
            query: 'tea',
            page: 2,
            perPage: 25,
            orientation:"landscape",
        }).then(result=>{
        if (result.errors) {
            // handle error here
            console.log('error occurred: ', result.errors[0]);
        } else {
            // handle success here
            const photos = result.response;
            console.log(photos);
            localforage.setItem("new",photos);

        }
    });
}



function set(teas){
    return localforage.setItem("teas",teas);
    //I wrote localStorage.setItem()
}

async function getTea(id){
    const teas:Tea[]=(await localforage.getItem("teas"))!;
    const tea=teas.find(item=>item.id.toString()===id);
    return tea??null;
}



export async function singleTeaLoader({params}) {
    let tea=await getTea(params.teaId);
    return tea;
}

/*get teas from jsonplaceholder directly
async function getTeas(query):Promise<Tea[]> {
    //implement search
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/")
    const res = await response.json();
    let teas=res.map(item => {
        return {id: item.id, name: item.title, fromWhere: item.userId, info: item.body};
    })
    if(query){
       teas=matchSorter(teas,query,{keys:["name"]}) ;
    }

    return teas.sort(sortBy("name"));
}*/
//get from localforage
export async function getTeas(query):Promise<Tea[]>{
    //let teas:Tea[]=(await localforage.getItem("teas"))!; //the assertion
    let teas:Tea[]=await loadTeaData()
    if(!teas) teas=[]
    if(query){
        teas=matchSorter(teas,query,{keys:["name","body"]});
    }
    return teas.sort(sortBy("name"));
    //return teas;
}
export async function newGetTeas(query){


}

async function loadTeaData() {
    //const sto= await localforage.getItem("new")
    const sto=await getFromJson();
    console.log("now")
    console.log(sto);
    const body=await sto.json();
    console.log(body);
    const results=body.results;
    const teas=results.map((item)=>{
        return {
            id: item.id,
            name: item.alt_description || 'No name provided',
            age: item.created_at,
            fromWhere: item.user.first_name,
            //info: `Image URL: ${item.urls.raw}`,
            info:item.user.bio,
            avatar: item.urls.raw,

        }

    })
    return teas;
}
async function getFromJson(){
    const data=await fetch('../public/this.json')
    return data;

}




/*async function getTeas(){
    //const teas=await fetch("");

    const li:number[]=[2312,453432,32132,3524];
    const teas:Tea[]=li.map((item,index)=>{return {id:item,name:"Product:"+item.toString(),age:item.toString(),fromWhere:"from"+item.toString(),info:"the info placeholder"}});
    return  teas;
}*/



