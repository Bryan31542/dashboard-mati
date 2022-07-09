import React, { useState } from "react";
import Services from "../../services/services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "../../context/ContextProvider";
import { db } from "../../services/firebase";
import { set, ref } from "firebase/database";

const Login = ({ setToken, setType }) => {
  const { currentColor } = useStateContext();

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email } = inputValues;
    const { password } = inputValues;

    if (email === "" || password === "") {
      toast.error("Por favor ingrese su correo y contraseña", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const response = await Services.login(email, password);

      if (response.token) {
        // Se guarda el token y el rol del usuario
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        setToken(response.token);
        setType(response.role);

        // Write in realtime database the email
        set(ref(db, "admins/"), {
          username: email,
        });

        toast.success("Bienvenido", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setInputValues({
          email: "",
          password: "",
        });
      }

      if (response.error_deleted) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        toast.error("El usuario no está activo.", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setInputValues({
          email: "",
          password: "",
        });
      }

      if (response.error) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        toast.error("Revisar credenciales", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setInputValues({
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded shadow-lg ring-2 ring-gray-800/50 lg:max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Mati
        </h1>

        <form className="mt-6">
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div>
            <label htmlFor="email" className="block text-sm text-gray-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="test@test.com"
              onChange={handleInputChange}
              value={inputValues.email}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-4">
            <div>
              <label htmlFor="password" className="block text-sm text-gray-800">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                onChange={handleInputChange}
                value={inputValues.password}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <a href="#" className="text-xs text-gray-600 hover:underline">
              Forget Password?
            </a>
            <div className="mt-6">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-purple-600"
              >
                Login
              </button>
            </div>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?
          <a href="#" className="font-medium text-gray-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
