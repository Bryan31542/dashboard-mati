import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GrStatusGoodSmall } from "react-icons/gr";
import Services from "../../../services/services";

const UserCard = ({ user, setFlag, setInputValues }) => {
  // get the token from the localStorage
  const token = localStorage.getItem("token");

  const id = user.uid;

  const onDelete = () => {
    Services.deleteUser(token, id).then((response) => {
      setFlag((prev) => !prev);
    });
  };

  const onEdit = () => {
    // set the input values to the user's data
    setInputValues({
      id: user.uid,
      name: user.name,
      age: user.age,
      gender: user.gender,
    });
  };

  return (
    <div
      className={
        "flex drop-shadow-sm bg-gray-50 m-3 rounded-md justify-between"
      }
    >
      <div className={"w-full"}>
        <div className={"flex justify-between  text-xs"}>
          <div className={"flex justify-between m-2 min-w-[50%]"}>
            <div className="align-middle text-center"> {user.name} </div>
            <div className="align-middle  text-center "> {user.email}</div>
          </div>
          <div className={"align-middle grid grid-cols-5 m-2 w-full"}>
            <div className="align-middle text-center"> {user.age}</div>

            <div className={"flex justify-center"}>
              <GrStatusGoodSmall
                className={"mr-2 mt-0.5"}
                fill={user.status ? "green" : "red"}
              />
              <div className="flex text-center text-gray-800">
                {user.status == true ? "Activo" : "Inactivo"}
              </div>
            </div>
            <div className="text-center">
              {" "}
              {user.gender == "MASCULINO" ? "M" : "F"}
            </div>
            <div className="text-center"> {user.followers.length} </div>
            <div className={"text-center"}>
              {" "}
              {!user.google
                ? new Date(user.createdAt).toLocaleDateString("en-CA")
                : ""}{" "}
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          "m-2 rounded-full hover:drop-shadow-2xl hover:scale-125 transition-all cursor-pointer"
        }
      >
        <button onClick={onEdit}>
          <AiFillEdit fill={"#1565C0"} />
        </button>
      </div>

      <div
        className={
          "m-2 rounded-full hover:drop-shadow-2xl hover:scale-125 transition-all cursor-pointer"
        }
      >
        <button onClick={onDelete}>
          <AiFillDelete fill={"#E53935"} />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
