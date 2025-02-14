import React, { createContext, useEffect, useState } from 'react';
import { Getbanner, GetData, GetProduct, GetProductById } from '../service/api';

export const DATA = createContext([]);

function Datacontext({ children }) {
    const [data, setData] = useState([]);
    const [mehsul, setMehsul] = useState([]);
    const [mehsulid, setMehsulid] = useState(null); // ID ilə məhsulu saxlayan state
    const [banner, setbanner] = useState([]);

    useEffect(() => {
        GetData().then(res => setData(res));
        GetProduct().then(res => setMehsul(res));
    }, []);

    // ID ilə məhsulu gətirmək üçün funksiya
    const fetchProductById = async (id) => {
        try {
            const res = await GetProductById(id);
            setMehsulid(res);
        } catch (error) {
            console.error("Məhsul tapılmadı:", error);
        }
    };

    return (
        <DATA.Provider value={{ data, mehsul, mehsulid, fetchProductById }}>
            {children}
        </DATA.Provider>
    );
}

export default Datacontext;
