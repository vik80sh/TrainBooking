const url = "http://localhost:4000"
const adminAPI =  `${url}/admin`;
const userAPI  =  `${url}/users`;
const trainAPI  =  `${url}/train`;
export const allAPI = {
    adminLogin :`${adminAPI}/adminLogin`,
    adminTokenVerify :`${adminAPI}/verify`,
    userRegistration :`${userAPI}/register`,
    userLogin : `${userAPI}/login`,
    getUsername :`${userAPI}/username`,
    addTrain : `${trainAPI}/addTrain`,
    trainList:`${trainAPI}/trainslist`,
}