import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Footer from './pages/Footer';
import Login from './pages/Login';
import ClientView from './pages/vista_cliente';
import TransporterView from './pages/vista_transportador';
import OwnerView from './pages/vista_dueño';
import Header from './pages/Header';


function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <HeaderWrapper />
                <main className="flex-1">
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/client' element={<ClientView />} />
                        <Route path='/transporter' element={<TransporterView />} />
                        <Route path='/owner' element={<OwnerView />} />
                        {/* Ruta para Cards si es independiente */}
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

function HeaderWrapper() {
    const location = useLocation();
    
    // Condicional para no mostrar el Header en la página de Login
    if (location.pathname === '/') {
        return null;
    }

    return <Header />;
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Footer from './pages/Footer';
// import Login from './pages/Login';
// import ClientView from './pages/vista_cliente';
// import TransporterView from './pages/vista_transportador';
// import OwnerView from './pages/vista_dueño';
// import AdminView from './pages/vista_admin';
// import Header from './pages/Header'; // Importa el Header

// function App() {
//     return (
//         <Router>
//             <div className="flex flex-col min-h-screen">
//                 <HeaderWrapper />
//                 <main className="flex-1">
//                     <Routes>
//                         <Route path='/' element={<Login />} />
//                         <Route path='/client' element={<ClientView />} />
//                         <Route path='/transporter' element={<TransporterView />} />
//                         <Route path='/owner' element={<OwnerView />} />
//                         <Route path='/admin' element={<AdminView />} />
//                         {/* Si la ruta '/cards' necesita un componente diferente, cámbiala aquí */}
//                         {/* <Route path='/cards' element={<CardsComponent />} /> */}
//                     </Routes>
//                 </main>
//                 <Footer />
//             </div>
//         </Router>
//     );
// }

// function HeaderWrapper() {
//     const location = useLocation();
    
//     // Condicional para no mostrar el Header en la página de Login
//     if (location.pathname === '/') {
//         return null;
//     }

//     return <Header />;
// }

// export default App;
