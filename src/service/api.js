import axios from "axios";

async function GetDAta() {
    const res=await axios.get("Data.json")
    return console.log(res.data);
    
}


export {GetDAta}