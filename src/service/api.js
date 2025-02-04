import axios from "axios";

async function GetDAta() {
    const res=await axios.get("http://finalprojectt-001-site1.jtempurl.com/api/Category")
    return res.data;
    
}

async function GetDAta2() {
    const res=await axios.get("http://finalprojectt-001-site1.jtempurl.com/api/Product")
    return res.data;
    
}
async function Getbanner() {
    const res=await axios.get("http://finalprojectt-001-site1.jtempurl.com/api/Location")
    return res.data;
    
}

export {GetDAta,GetDAta2,Getbanner}