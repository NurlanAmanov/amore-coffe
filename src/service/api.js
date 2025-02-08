import axios from "axios";


async function GetData() {
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Category");
    return res.data;
}

async function GetProduct() {
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Product");
    return res.data;
}

async function getLocation() {
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Location")
    return res.data
}
async function Getbanner() {
    const res=await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Location")
    return res.data;
    
}

export {GetData,GetProduct,Getbanner,getLocation}