import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./useAuth"
import { Alert } from "react-native";
import { useEffect, useState } from "react";




export const useUser = () => {

    const {currentUser} = useAuth();

    const {data:userData,isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {

            const user = await currentUser()
            if(user){
                return user as User
            }
        }
    })

    const [user, setUser] = useState({} as User)

    useEffect(()=> {

        if(userData) setUser(userData)

    },[userData])

    return {
        user,isLoading
    }
}