import React, { useEffect, useState } from "react";
import Services from "../../services/services";
import UserCard from "./User/UserCard";
import {
  BsArrowLeftCircleFill,
  BsArrowRight,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import { useStateContext } from "../../context/ContextProvider";
import { BiEdit } from "react-icons/bi";

import { MdAddBox } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

import { Header } from "../../components";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const Users = () => {
  // get the token from localStorage
  const token = localStorage.getItem("token");

  const [usersCards, setUsersCards] = useState([]);
  const [flag, setFlag] = useState(false);
  const { currentColor } = useStateContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);

  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
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

    const { name, email, password, age, gender } = inputValues;

    // check that fields are not empty
    if (
      name === "" &&
      email === "" &&
      password === "" &&
      age === "" &&
      gender === ""
    ) {
      toast.error("Por favor rellene los datos", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      Services.createUser(token, {
        name,
        email,
        password,
        age,
        gender,
      }).then((res) => {
        setFlag((prev) => !prev);
      });

      setInputValues({
        id: "",
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
      });
    }
  };

  useEffect(() => {
    Services.getAllUsers(token, 0).then((response) => {
      setUsersCards(response.users);
      setTotal(response.total);
    });
  }, [flag]);

  const skip = 15;

  const onNext = async () => {
    console.log(currentPage);
    if (currentPage < total - skip) {
      const response = await Services.getAllUsers(token, currentPage + skip);
      setUsersCards(response.users);
      setCurrentPage(currentPage + skip);
      console.log(`aqui mero ${currentPage}`);
    } else {
      toast.error("No hay más usuarios", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onPrev = async () => {
    // if we are at the beggining of the list, we will show a toast message, otherwise we will show the previous page
    if (currentPage < skip) {
      toast.error("No hay más usuarios", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log(`dsa: ${currentPage}`);
    } else {
      const response = await Services.getAllUsers(token, currentPage - skip);
      setUsersCards(response.users);
      setCurrentPage(currentPage - skip);
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log(`Prev: ${currentPage}`);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const { id, name, email, age, gender } = inputValues;

    await Services.editUser(token, id, { name, email, age, gender }).then(
      (res) => {
        setFlag((prev) => !prev);
      }
    );

    setInputValues({
      id: "",
      name: "",
      email: "",
      password: "",
      age: "",
      gender: "",
    });
  };

  return (
    <div>
      <div className="m-2 mt-20 md:m-10 p-2 md:p-10 bg-white rounded-3xl pt-10">
        <Header category="Page" title="Users" />

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

        <div className="flex">
          <form className="flex">
            <input
              type="name"
              name="name"
              placeholder="John Wick"
              value={inputValues.name}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <input
              type="email"
              name="email"
              placeholder="test@test.com"
              value={inputValues.email}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <input
              type="password"
              name="password"
              placeholder="******"
              value={inputValues.password}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <input
              type="number"
              name="age"
              placeholder="15"
              value={inputValues.age}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <input
              type="text"
              name="gender"
              placeholder="MASCULINO"
              value={inputValues.gender}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <button type="submit" onClick={handleSubmit}>
              <MdAddBox className="text-3xl" fill="green" />
            </button>
            <button onClick={handleEdit}>
              <BiEdit className="text-3xl" fill={"#1565C0"} />
            </button>
          </form>
        </div>

        <div className={"flex  m-3 rounded-md justify-between font-semibold"}>
          <div className={"w-full"}>
            <div className={"flex justify-between  text-xs"}>
              <div className={"flex justify-between m-2 min-w-[50%]"}>
                <div className="align-middle text-center"> Nombre </div>
                <div className="align-middle  text-center "> Email</div>
              </div>
              <div className={"align-middle grid grid-cols-5 m-2 w-full"}>
                <div className="align-middle text-center"> Edad</div>

                <div className={"flex justify-center"}>
                  <div className="flex text-center">Estado</div>
                </div>
                <div className="text-center"> Género</div>
                <div className="text-center"> Amigos </div>
                <div className={"text-center"}> Fecha de Creación </div>
              </div>
            </div>
          </div>

          <div
            className={
              "invisible m-2 rounded-full hover:drop-shadow-2xl hover:scale-125 transition-all cursor-pointer"
            }
          >
            <AiFillEdit fill={"#1565C0"} />
          </div>

          <div
            className={
              "invisible rounded-full hover:drop-shadow-2xl hover:scale-125 transition-all cursor-pointer"
            }
          >
            <AiFillDelete fill={"#E53935"} />
          </div>
        </div>

        {usersCards.map((user) => (
          <UserCard
            key={user.uid}
            user={user}
            setFlag={setFlag}
            setInputValues={setInputValues}
          />
        ))}

        <div className={"w-full flex m-5 justify-center"}>
          <div className={"m-5"}>
            <button onClick={onPrev}>
              <BsArrowLeftCircleFill
                className={
                  "text-2xl hover:scale-125 transition-all cursor-pointer"
                }
                fill={currentColor}
              />
            </button>
          </div>
          <div className={"m-5"}>
            <button onClick={onNext}>
              <BsArrowRightCircleFill
                className={
                  "text-2xl hover:scale-125 transition-all cursor-pointer"
                }
                fill={currentColor}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
