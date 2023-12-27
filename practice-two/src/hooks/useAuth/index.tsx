import { AuthContext } from "@contexts/Authentication"
import { useContext } from "react"

const useAuth = () => {
  const {auth,setAuth} = useContext(AuthContext)

  return {auth,setAuth}
}

export default useAuth