
import { SignInType } from "@/schemas/auth"
import { api } from "@/service"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {jwtDecode} from 'jwt-decode';


export const useAuth = () => {


    const signIn = async (payload:SignInType):Promise<ServerResponse> => {

        try {

            const req = await api.post('/login',payload)

            return {
                data:req.data
            }
            
        } catch (error) {
            
            console.log('Erro!');
            
            console.log(`Erro ao autenticar usuário: ${error}`);
            
            return {
                error: 'Error ao autenticar!'
            }
        }


    }

    const signUp = async (payload:CreateUserType):Promise<ServerResponse> => {


        try {

            const req = await api.post('/users',payload)

            return {
                data:req.data
            }
            
        } catch (error) {
            
            console.log(`Erro ao registrar usuário: ${error}`);
            
            return {
                error: 'Error ao registrar usuário'
            }
        }
    }

    const signOut = async () => {

    }

    const storageToken = async (token:string) => {
        await AsyncStorage.setItem('token', token)
    }

    const getToken = async () => {

        const token = await AsyncStorage.getItem('token');

        if(!token) return
        
        return token
        

    }

    const currentUser = async ():Promise<ServerResponse> => {

        const token = await AsyncStorage.getItem('token')

        if(!token) return {error: 'Usuário não autenticado!'}


        const decoded = jwtDecode(token)

        try {

            //@ts-ignore
            const user_id = decoded.user_id
            
            const req = await api.get(`/users/${user_id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })


            return req.data
            
            
        } catch (error) {
            console.log('Erro ao pegar usuário: ', error);

            return {
                error: 'Erro ao pegar usuário'
            }
            
        }
        


    }

    return {
        signIn,
        signUp,
        signOut,
        storageToken,
        currentUser,
        getToken
    }
}