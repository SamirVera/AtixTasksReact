import React, { useState } from 'react';
import '../../styles/Form.css';
import axios from 'axios'; // Importa axios

function SignUp() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3005/api/usuarios', {
                nombre: nombre,
                email: email,
                password: password
            });

            if (response.data.ok) {
                console.log('Usuario registrado:', response.data);
            } else {
                console.log('Algo salió mal:', response.data);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error.response ? error.response.data : 'Error desconocido');
        }
    }

    return (
        <div className="form-container">
            <h2 style={{ textAlign: 'center' }}>SignUp</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-label">
                    Username:
                    <input
                        type="username"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-label">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-label">
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-button">Register</button>
            </form>
        </div>
    );
}

export default SignUp;
