import axios from "axios";

async function GetCabinet(){
    const res = await axios.get("https://amore.cavidhuseynov.me/swagger/index.html/api/Product")
    return res.data
}
export {GetCabinet}