import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {

    return (
        <>
        <footer class="bg-gray-500 rounded-t-lg shadow mt-3">
            <div class="w-full mx-auto p-4 md:py-8">
                <div>
                    <a class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <svg class="w-10 h-10 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.535a3.5 3.5 0 1 0 6.93 0h3.07a3.5 3.5 0 1 0 6.93 0H21a1 1 0 0 0 1-1v-4a.999.999 0 0 0-.106-.447l-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.192 11.59.016.02a1.5 1.5 0 1 1-.016-.021Zm-10 0 .016.02a1.5 1.5 0 1 1-.016-.021Zm5.806-5.572v-2.02h4.396l1 2.02h-5.396Z" clip-rule="evenodd"/>
                    </svg>
                        <span class="self-center text-2xl font-semibold whitespace-nowrap">EmpresaTransporte</span>
                    </a>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <span class="block text-sm text-gray-900 sm:text-center hover:text-gray-50">© 2023 <a href="#" class="hover:text-gray-50">EmpresaTransporte™</a></span>
                <span class="block text-sm text-gray-900 sm:text-center hover:text-gray-50">© <a href="#" class="hover:text-gray-50">Darwin Lesmes</a></span>

            </div>
        </footer>
        </>
    );
};

export default Footer;