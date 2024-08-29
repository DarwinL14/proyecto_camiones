import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aquí puedes agregar lógica para cerrar sesión
        // Ejemplo: eliminar token de autenticación, hacer una llamada API para cerrar sesión, etc.

        // Redirigir al usuario a la página de inicio de sesión
        navigate("/");
    };

    return (
        <nav className="border-gray-200 bg-gray-500">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a className="flex">
                <svg class="w-10 h-10 text-gray-800 hover:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.535a3.5 3.5 0 1 0 6.93 0h3.07a3.5 3.5 0 1 0 6.93 0H21a1 1 0 0 0 1-1v-4a.999.999 0 0 0-.106-.447l-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.192 11.59.016.02a1.5 1.5 0 1 1-.016-.021Zm-10 0 .016.02a1.5 1.5 0 1 1-.016-.021Zm5.806-5.572v-2.02h4.396l1 2.02h-5.396Z" clip-rule="evenodd"/>
                </svg>
                <span class="self-center text-xl font-semibold whitespace-nowrap text-gray-800 ">EmpresaTransporte</span>
                </a>

                <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <button
                                onClick={handleLogout}
                                className="block py-2 px-3 text-black rounded bg-gray-600 hover:bg-gray-800 hover:text-white"
                            >
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;