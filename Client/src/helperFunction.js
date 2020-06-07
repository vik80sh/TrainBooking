import axios from 'axios'
import { allAPI } from './constant';
import { store } from "./index";

const restrationData = {
    message: "Username already present or Some Internal issue",
    status: "failed"
}
const data = {
    message: "Username or Password is wrong or or Some Internal issue",
    status: "failed"
}
const tarinData = {
    message: "Unauthorized request or Somthing Internal Issue",
    status: "failed"
}
export const HelpersFunction = {
    userRegistration: async (body) => {
        console.log("allAPI.userRegistration ", allAPI.userRegistration)
        try {
            const res = await axios.post(allAPI.userRegistration, body);
            return res.data;
        }
        catch (err) {
            return restrationData;
        }
    },
    userLogin: async (body) => {
        console.log(body, "allAPI.userLogin ", allAPI.userLogin)

        try {
            const res = await axios.post(allAPI.userLogin, body);
            return res.data;
        }
        catch (err) {
            return data;
        }
    },
    adminLogin: async (body) => {

        try {
            const res = await axios.post(allAPI.adminLogin, body);
            return res.data;
        }
        catch (err) {
            return data;

        }
    },
    addTrain: async (body) => {
        body.token = store.getState().loginReducer.token;
        try {
            const res = await axios.post(allAPI.addTrain, body);
            return res.data;
        }
        catch (err) {
            return tarinData;
        }
    },
    getTrainList: async (source, destination) => {
        let body = {
            source: source,
            destination: destination,
        }
        
        try {
            const res = await axios.get(allAPI.trainList, {params:body});
            return res.data;
        }
        catch (err) {
            return tarinData;
        }
    },
}