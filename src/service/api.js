import axios from "axios";

async function GetDAta() {
    const res=await axios.get("http://finalprojectt-001-site1.jtempurl.com/api/Category")
    return res.data;
    
}


export {GetDAta}