import axios from "axios";

const BASE_URL = "https://finalprojectt-001-site1.jtempurl.com/api/Auth";

export const registerUser = async (formData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/Register`,
            {
                name: formData.name,
                surname: formData.lname,
                email: formData.email,
                dateOfBirth: formData.dob,
                gender: formData.gender,
                password: formData.password,
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("API ilə əlaqə qurulmadı.");
    }
};
