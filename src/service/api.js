import axios from "axios";

const BASE_URL = window.location.protocol === "https:"
    ? "https://finalprojectt-001-site1.jtempurl.com/api"
    : "http://finalprojectt-001-site1.jtempurl.com/api";

async function GetData() {
    const res = await axios.get(`${BASE_URL}/Category`);
    return res.data;
}

async function GetData2() {
    const res = await axios.get(`${BASE_URL}/Product`);
    return res.data;
}

async function Getbanner() {
    const res=await axios.get("http://finalprojectt-001-site1.jtempurl.com/api/Location")
    return res.data;
    
}

export {GetData,GetData2,Getbanner}