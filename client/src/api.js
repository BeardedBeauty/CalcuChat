import axios from "axios";
const host = "https://immense-falls-83737.herokuapp.com/eq";
// const host = "http://192.168.0.35:3010/eq";

export default {
    getEq: function () {
        return axios.get(host).catch(err => console.log(err));
    },
    newEq: function (post) {
        return axios.post(host, post).catch(err => console.log(err));
    }
}