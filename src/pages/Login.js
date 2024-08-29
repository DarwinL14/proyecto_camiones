import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../data/users.json'; // Asegúrate de tener este archivo
import roles from '../data/roles.json'; // Asegúrate de tener este archivo

async function authenticateUser(email, password) {
    // Buscar al usuario en la lista de usuarios
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        // Retornar el rol del usuario
        return user.role;
    } else {
        // Retornar null si no se encuentra el usuario o las credenciales son incorrectas
        return null;
    }
}

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        // Autenticar al usuario y obtener el rol
        const userRole = await authenticateUser(email, password);
        if (userRole && roles[userRole]) {
            // Redirigir al usuario a la vista correspondiente
            navigate(`/${userRole}`);
        } else {
            // Manejo de error: credenciales inválidas o rol no encontrado
            alert('Credenciales inválidas o rol no encontrado');
        }
    };

    return (
        <section className="bg-indigo-200">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h1 className='flex p-4'>
                        <svg class="w-10 h-10 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.535a3.5 3.5 0 1 0 6.93 0h3.07a3.5 3.5 0 1 0 6.93 0H21a1 1 0 0 0 1-1v-4a.999.999 0 0 0-.106-.447l-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.192 11.59.016.02a1.5 1.5 0 1 1-.016-.021Zm-10 0 .016.02a1.5 1.5 0 1 1-.016-.021Zm5.806-5.572v-2.02h4.396l1 2.02h-5.396Z" clip-rule="evenodd"/>
                        </svg>
                        <span class="self-center text-3xl font-semibold whitespace-nowrap hover:text-gray-700">EmpresaTransporte</span>
                </h1>
                <div className="w-full max-w-md bg-gray-800 border border-gray-500 rounded-lg shadow-md">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight text-center text-white md:text-2xl">
                            Inicio de Sesión
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                                    Usuario
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-gray-700 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="nombre@empresa.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-700 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Ingresar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;


