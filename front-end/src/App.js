import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ClientesList from "./Components/ClientesList";
import NavigationBar from "./Components/NavigationBar";
import UserInfo from "./Components/UserInfo";

function App() {
  return (
    <div className="bg-[#FF9671] min-h-screen flex flex-col">
      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<ClientesList />} />
          <Route
            path="/ver/:clienteId"
            element={
              <div className="flex-1 flex justify-center items-center">
                <UserInfo />
              </div>
            }
          />
          {/* Nueva ruta para mostrar todos los datos del usuario */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
