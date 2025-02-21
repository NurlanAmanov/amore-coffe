import React, { useState } from 'react';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Şifrələr uyğun gəlmir.');
      return;
    }

    const resetData = {
      email: "nurlanamanov31@gmail.com",
      token: "CfDJ8AlJhaGF4v9FiR7oyAIml3p3EOHlxp1CiOEe/eOZVlwnDgyJTPu62HRDOCZAZy+eC/duphaz4uiyweCDsEU0j1wqtd2XEkqCtjL+KdbVj2t3Szm2417Sq8JEK4Iv/yp1jYWe0+zsqtsC+3/fMw7UL35Z+M5nGQ3zVrRulz3jkqlC5LUDEmpwVuftaJVQq7fGi/t8EMXnWkPVO4v5NG19pw4AiaMCLNCkUya38tkxbhKN",
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };

    try {
      const response = await fetch('https://finalprojectt-001-site1.jtempurl.com/api/Auth/ResetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Şifrəniz uğurla yeniləndi!');
      } else {
        setMessage(result.message || 'Şifrə yenilənməsi zamanı xəta baş verdi.');
      }
    } catch (error) {
      setMessage('Xəta baş verdi: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Şifrəni Yenilə</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Yeni Şifrə:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Yeni Şifrəni Təsdiqlə:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Şifrəni Yenilə</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;