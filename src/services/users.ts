import axios from "libs/overridedAxios";

const baseURL = "/users";

const usersServices = {
    info: () => {
        const url = baseURL + "/info";
        return axios.post(url);
    },
};

export default usersServices;
