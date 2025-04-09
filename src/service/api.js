import axios from "axios";


async function GetCategory() {
    const res = await axios.get("https://amore.cavidhuseynov.me/swagger/index.html/api/Category");
    return res.data;
}

async function GetProduct() {
    const res = await axios.get("https://amore.cavidhuseynov.me/swagger/index.html/api/Product");
    return res.data;
}
async function GetProductById(id) {

        const res = await axios.get(`https://amore.cavidhuseynov.me/swagger/index.html/api/Product/${id}`);
        return res.data; // ✅ ID-yə görə məhsulu qaytarır
  
}

async function Getbanner() {
    const res = await axios.get("https://amore.cavidhuseynov.me/swagger/index.html/api/HeadBanners")
    return res.data;

}
async function Getsilder() {
    const res = await axios.get("https://amore.cavidhuseynov.me/swagger/index.html/api/Slider")
    return res.data;

}
async function Getslogan() {
    const res = await axios.get("https://amore.cavidhuseynov.me/swagger/index.html/api/Slogan")
    return res.data;

}
async function GetSocialMedia() {
    const res = await axios.get("https://amore.cavidhuseynov.me/swagger/index.html/api/SocialMedia")
    return res.data;

}

async function GetLogo() {
    const res = await axios.get("https://amore.cavidhuseynov.me/swagger/index.html/api/Logo")
    return res.data;

}
async function GetLocation() {
    const res = await axios.get("https://amore.cavidhuseynov.me/swagger/index.html/api/Location")
    return res.data;

}
async function GetAuth() {
    const res = await axios.get("https://amore.cavidhuseynov.me/swagger/index.html/api/Auth")
    return res.data;

}



export { GetCategory, GetProduct, Getbanner,GetSocialMedia,GetLogo,Getslogan,Getsilder,GetLocation,GetProductById,GetAuth }
