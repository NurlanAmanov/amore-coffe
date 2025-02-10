const BASE_URL = "https://finalprojectt-001-site1.jtempurl.com/api/Auth";

export const registerUser = async (formData) => {
    const formattedDate = formData.dob ? new Date(formData.dob).toISOString().split("T")[0] : "";

    const dataToSend = {
        Name: formData.name,
        Surname: formData.lname,
        Gender: formData.gender,
        DateOfBirth: formattedDate,
        UserName: formData.userName,
        Email: formData.email,
        Password: formData.password,
        ConfirmPassword: formData.cpassword,
    };

    console.log("Göndərilən API sorğusu:", dataToSend); // Debug üçün

    try {
        const response = await fetch(`${BASE_URL}/Register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // JSON formatı göndəririk
            },
            body: JSON.stringify(dataToSend), // JSON obyektini stringify edirik
        });

        console.log("HTTP Status:", response.status);
        console.log("Response Headers:", response.headers);

        if (!response.ok) {
            throw new Error(`Server xəta qaytardı: ${response.status}`);
        }

        const data = await response.json();
        console.log("JSON Cavab:", data);
        return data;
    } catch (error) {
        console.error("Qeydiyyat zamanı xəta:", error);
        throw error;
    }
};
