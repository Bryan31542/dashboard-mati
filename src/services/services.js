import axios from "axios";

const API_URL = "https://apimati.herokuapp.com/api";

const Services = {};

Services.login = async (email, password) => {
  return axios
    .post(`${API_URL}/auth/login`, { email, password })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

Services.getAllUsers = async (token, skip) => {
  return axios
    .get(`${API_URL}/users?limit=15&skip=${skip}`, {
      headers: {
        "x-token": token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

Services.deleteUser = async (token, id) => {
  return axios
    .delete(`${API_URL}/users/${id}`, {
      headers: {
        "x-token": token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

Services.createUser = async (token, user) => {
  return axios
    .post(`${API_URL}/users`, user, {
      headers: {
        "x-token": token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

Services.getUser = async (token, id) => {
  return axios
    .get(`${API_URL}/users/${id}`, {
      headers: {
        "x-token": token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

Services.editUser = async (token, id, user) => {
  return axios
    .put(`${API_URL}/users/${id}`, user, {
      headers: {
        "x-token": token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export default Services;
