import http from "./http";

class UserService {
    all() {
        return http.get("/all")
    }

    create(usr){
        return http.post("/create", usr)
    }

    find(id){
        return http.get(`/find/${id}`)
    }

    update(usr){
        console.log(`User passed into parameter ${JSON.stringify(usr)}`)
        return http.put("/update", usr)
    }

    delete(id){
        return http.delete(`/delete/${id}`)
    }
}

export default new UserService()