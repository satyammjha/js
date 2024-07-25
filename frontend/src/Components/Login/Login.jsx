import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const predefinedId = 'test1000';
        const predefinedPassword = 'correct@133';

        if (id === predefinedId && password === predefinedPassword) {
            navigate('/Apix3873');
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 ml-[3%] md:ml-[35vw]">
            <h1 className="text-[2rem] md:text-3xl mb-6 font-bold text-center">Please enter your credentials</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
                <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="bg-none p-2 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter userid"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-none p-2 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;