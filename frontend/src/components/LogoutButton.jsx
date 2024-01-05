import { api } from "../utilities"
import Button from "react-bootstrap/esm/Button"

export const LogoutButton = () => {

    const logOut = async() => {
        let token = localStorage.getItem("token")
        

        let response = await api.post("users/logout/", null, {
            headers: {
                Authorization: `Token ${token}`,
            },
        }).catch(err=>{
            console.log(err, "Something went wrong logging out.")
        });

        if (response.status === 200) {
            localStorage.removeItem("token")
            localStorage.clear()
            delete api.defaults.headers.common["Authorization"];
            window.location.reload()
        }
        else {
            console.log("Somethng went wrong logging out.")
        }

    }



    return (
        <>
        <Button variant="warning" type="submit" onClick={()=>logOut()}>Log Out</Button>
        </>
    )

}