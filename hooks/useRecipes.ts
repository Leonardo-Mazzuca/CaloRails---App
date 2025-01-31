import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import { api } from "@/service"
import { useUser } from "./useUser"


export const useRecipes = () => {

    const [recipes, setRecipes] = useState<Recipe[]>([])

    

    const {getToken} = useAuth();


    const {data,isLoading, refetch} = useQuery<Recipe[]>({
        queryKey: ['recipes'],
        queryFn: async () => {

            const token = await getToken();

            const req = await api.get('recipes',{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return req.data

        }
    })

    useEffect(() => {

        if (data) {

            setRecipes(data);
        }

    }, [data]);


    const createRecipe = async (data:any):Promise<ServerResponse> => {


        try {

            const token = await getToken()

            
            const req = await api.post('/recipes',data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type' : 'multipart/form-data'
                    }
                }
            )

            
            return {
                data: req.data
            }
            
        } catch (error:any) {

            console.log('Erro criando receita: ', JSON.stringify(error));
            
            return {
                error: 'Erro ao criar receita'
            }
            
        }
    }

    const getRecipe = async (id:number):Promise<ServerResponse> => {

        try {

            const token = await getToken()

            const req = await api.get(`/recipes/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return {
                data: req.data as Recipe
            }
            
        } catch (error) {
            
            return{
                error: 'Erro ao pegar receita!'
            }
        }

    } 

    const deleteRecipe = async (id:number):Promise<ServerResponse> => {

        const token = await getToken();

        try {

            await api.delete(`/recipes/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            return {
                data: 'Receita deletada com sucesso!'
            }
            
        } catch (error) {

            console.log('Erro ao deletar receita: ', JSON.stringify(error));
            
            return {
                error: 'Erro deletando receita!'
            }
        }

    }

    

    return {
        recipes, isLoading,
        refetch, createRecipe,
        getRecipe, deleteRecipe
    }
}