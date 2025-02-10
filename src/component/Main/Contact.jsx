import React, { useState } from "react";
import ContactForm from "./Contactfomr";

function Contact() {
  

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
                           <ContactForm/>

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
