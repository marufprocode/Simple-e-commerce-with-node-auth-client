import axios from "axios";


const authApi = axios.create({
    baseURL: "https://simple-e-commerce-server.vercel.app",
    headers:{
        authorization: `bearer ${localStorage.getItem("Token")}`,
    }
})
const userApi = axios.create({
    baseURL: "https://simple-e-commerce-server.vercel.app",
})

export const getAuth = async () => {
    const response = await authApi.get("/getauth")
    return response.data.userData
}
export const getUser = async (credential) => {
    const response = await userApi.post("/login", credential)
    return response.data
}

