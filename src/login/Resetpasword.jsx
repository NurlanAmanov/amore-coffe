import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function ResetPassword() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    const token = queryParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        if (name === 'newPassword') setNewPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Şifrəni təsdiq edin!');
            return;
        }

        try {
            const response = await fetch('https://finalprojectt-001-site1.jtempurl.com/api/Auth/ResetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    token,
                    newPassword,
                }),
            });

            if (!response.ok) {
                throw new Error('Şifrə sıfırlanarkən xəta baş verdi.');
            }

            const data = await response.json();
            console.log('Şifrə sıfırlandı:', data);
            alert('Şifrə uğurla sıfırlandı!');
        } catch (error) {
            console.error('Xəta:', error);
            alert('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
        }
    };

    return (
        <div className="min-h-screen py-[100px] bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
                <h1 className="text-center text-2xl font-bold mb-6">Şifrəni Sıfırlayın</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="newPassword">
                            Yeni Şifrə
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            placeholder="Yeni şifrənizi daxil edin"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
                            Şifrəni Təsdiq Edin
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Şifrənizi təsdiq edin"
                            value={confirmPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        Şifrəni Sıfırlayın
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
