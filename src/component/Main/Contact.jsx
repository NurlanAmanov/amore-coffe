import React, { useState } from "react";
import axios from "axios";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSuccessMessage("");
      setErrorMessage("");
  
      // Boş inputları yoxlayırıq
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
          setErrorMessage("Zəhmət olmasa bütün sahələri doldurun.");
          setIsSubmitting(false);
          return;
      }
  
      // Multipart formatında formData obyektini yaradırıq
      const formDataToSend = new FormData();
      formDataToSend.append("Name", formData.name);
      formDataToSend.append("Email", formData.email);
      formDataToSend.append("Comment", formData.message);
  
      try {
          const response = await axios.post(
              "https://finalprojectt-001-site1.jtempurl.com/api/Contact",
              formDataToSend,
              {
                  headers: {
                      "Content-Type": "multipart/form-data", // Backend multipart gözlədiyi üçün
                  },
              }
          );
  
          console.log("Serverdən cavab:", response.data);
          setSuccessMessage("Mesajınız uğurla göndərildi!");
          setFormData({ name: "", email: "", message: "" }); // Formanı sıfırlayırıq
      } catch (error) {
          console.error("Xəta baş verdi:", error.response ? error.response.data : error.message);
          setErrorMessage("Mesaj göndərilərkən xəta baş verdi.");
      } finally {
          setIsSubmitting(false);
      }
  };
  
  

    return (
        <>
            <section className="py-12">
                <div className="container my-12 mx-auto px-2 md:px-4">
                    <section className="mb-32">
                        <div className="flex justify-center">
                            <div className="text-center md:max-w-xl lg:max-w-3xl">
                                <h2 className="mb-12 px-6 text-3xl font-bold">Bizimlə Əlaqə</h2>
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            {/* Əlaqə Formu */}
                            <form onSubmit={handleSubmit} className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
                                <div className="mb-3 w-full">
                                    <label className="block font-medium mb-[2px] text-teal-700" htmlFor="name">
                                        Ad:
                                    </label>
                                    <input
    type="text"
    name="name"
    className="px-2 py-2 border w-full outline-none rounded-md"
    id="name"
    placeholder="Ad"
    value={formData.name}
    onChange={handleChange}
    required
/>
                                </div>

                                <div className="mb-3 w-full">
                                    <label className="block font-medium mb-[2px] text-teal-700" htmlFor="email">
                                        Email:
                                    </label>
                                    <input
    type="email"
    name="email"
    className="px-2 py-2 border w-full outline-none rounded-md"
    id="email"
    placeholder="E-poçt ünvanınız"
    value={formData.email}
    onChange={handleChange}
    required
/>

                                </div>

                                <div className="mb-3 w-full">
                                    <label className="block font-medium mb-[2px] text-teal-700" htmlFor="message">
                                        Mesaj:
                                    </label>
                                    <textarea
    name="message"
    className="px-2 py-2 border rounded-[5px] w-full outline-none"
    id="message"
    placeholder="Mesajınızı yazın..."
    value={formData.message}
    onChange={handleChange}
    required
></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="mb-6 inline-block w-full rounded bg-teal-400 px-6 py-2.5 font-medium uppercase leading-normal text-white hover:shadow-md hover:bg-teal-500"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Göndərilir..." : "Göndər"}
                                </button>

                                {successMessage && <p className="text-green-600">{successMessage}</p>}
                                {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                            </form>

                            {/* Əlaqə Məlumatları */}
                            <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                                <div className="flex flex-wrap">
                                    {/* Texniki Problem */}
                                    <ContactInfoCard
                                        iconBg="bg-yellow-200"
                                        iconText="text-yellow-800"
                                        title="Texniki problem"
                                        email="support@example.com"
                                        phone="+1 234-567-89"
                                    />

                                    {/* Məhsullar Haqqında */}
                                    <ContactInfoCard
                                        iconBg="bg-green-200"
                                        iconText="text-green-800"
                                        title="Məhsullar Haqqında Sorğular"
                                        email="sales@example.com"
                                        phone="+1 234-567-89"
                                    />

                                    {/* Kampaniyalar və Xəbərlər */}
                                    <ContactInfoCard
                                        iconBg="bg-blue-200"
                                        iconText="text-blue-800"
                                        title="Kampaniyalar və Xəbərlər"
                                        email="press@example.com"
                                        phone="+1 234-567-89"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
}

const ContactInfoCard = ({ iconBg, iconText, title, email, phone }) => {
    return (
        <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
            <div className="flex items-start">
                <div className="shrink-0">
                    <div className={`inline-block rounded-md ${iconBg} p-4 ${iconText}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16m-7 8H4m6-4H4m14-5v10a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h10a2 2 0 012 2z" />
                        </svg>
                    </div>
                </div>
                <div className="ml-6 grow">
                    <p className="mb-2 font-bold text-brown-800">{title}</p>
                    <p className="text-neutral-600">{email}</p>
                    <p className="text-neutral-600">{phone}</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
