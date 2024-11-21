import axios from "axios";

const httpService = axios.create({
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true
});

export default httpService