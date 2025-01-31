import { transformRecipe } from "@/functions"
import axios from "axios"
import { useState } from "react"

type Response = {
    error?:string,
    data?:any
}

export const useNutrition = () => {

    const [isLoading, setIsLoading] = useState(false)

    const getRecipeNutritionFacts = async (recipe:string, title:string):Promise<Response> => {

        setIsLoading(true)
        const ingr = transformRecipe(recipe)

        try {
    
          const edamanApiKey = process.env.EXPO_PUBLIC_EDAMAN_NUTRITION_API_KEY
          const appId = process.env.EXPO_PUBLIC_EDAMAN_NUTRITION_APP_ID
    
    
          const body = {
            title,
            ingr,
          }
    
          const req = await axios.post(`https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${edamanApiKey}`,body)
          
          return {
            data: req.data as FoodNutrition
          }
          
        } catch (error) {
    
          console.log('Erro: ',JSON.stringify(error));
        
          
          return {
            error:'Erro descrevendo a receita!'
          }
          
        } finally {
            setIsLoading(false)
        }
    
    
      }

      const getFoodById = async (foodId: string):Promise<Food | null> => {

        const edamanApiKey = process.env.EXPO_PUBLIC_EDAMAN_API_KEY;
        const appId = process.env.EXPO_PUBLIC_EDAMAN_APP_ID;
    
        try {
    
          const response = await axios.get(
            `https://api.edamam.com/api/food-database/v2/parser`,
            {
              params: {
                app_id: appId,
                app_key: edamanApiKey,
                ingr: foodId, 
              },
            }
          );
    
          return response.data.hints[0].food as Food
    
        } catch (error:any) {
          console.log('Erro ao buscar alimento: ', error.message);
        } 
    
        return null
    
      };
    

    return {
        getRecipeNutritionFacts,
        isLoading,
        getFoodById
    }

}