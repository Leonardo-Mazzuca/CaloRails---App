import { api } from "@/service";
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";

export const useMeal = () => {
  const { getToken } = useAuth();

  const [isFetchingMeals, setIsFetchingMeals] = useState(false);
  const [isPostingFood, setIsPostingFood] = useState(false);
  const [isPatchingFood, setIsPatchingFood] = useState(false);
  const [isMovingFood, setIsMovingFood] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0)
  const postFood = async (data: CreateFood): Promise<ServerResponse> => {
    setIsPostingFood(true);

    const token = await getToken();

    console.log(data);

    try {
      const req = await api.post("/foods", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return {
        data: req.data,
      };
    } catch (error) {
      console.log(
        "Erro adicionando alimento na refeição: ",
        JSON.stringify(error)
      );

      return {
        error: "Erro ao adicionar alimento na refeicao!",
      };
    } finally {
      setIsPostingFood(false);
    }
  };

  const patchFood = async (
    data: CreateFood,
    database_food_id: number
  ): Promise<ServerResponse> => {
    setIsPatchingFood(true);

    const token = await getToken();

    try {
      const req = await api.patch(`/foods/${database_food_id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return {
        data: req.data,
      };
    } catch (error) {
      console.log(
        "Erro atualizar alimento na refeição: ",
        JSON.stringify(error)
      );

      return {
        error: "Erro ao atualizar alimento na refeicao!",
      };
    } finally {
      setIsPatchingFood(false);
    }
  };

  const createMeals = async (body: Meal): Promise<ServerResponse> => {
    const token = await getToken();

    try {
      const req = await api.post("/meals", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ? apenas para debbug seguindo a lógica de que a refeição já foi criada.

      // console.log('Dados aqui no createMeals: ', req.data);

      return {
        data: req.data,
      };
    } catch (error) {
      console.log("Erro ao criar refeições diárias", JSON.stringify(error));

      return {
        error: "Erro ao criar refeicao!",
      };
    }
  };

  const getMeals = async (date?: string): Promise<ServerResponse> => {
    const token = await getToken();

    setIsFetchingMeals(true);

    try {
      const req = await api.get(`/meals${date ? "?date=" + date : ""}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //? debug console.log(req.data);

      return {
        data: req.data,
      };
    } catch (error: any) {
      console.log(
        `Erro ao pegar refeições do dia ${date} \n\n ${JSON.stringify(error)}`
      );

      return {
        error: "Erro ao mapear refeições!",
      };
    } finally {
      setIsFetchingMeals(false);
    }
  };

  const moveFood = async (
    food: FoodOnMeal,
    meal_id: number
  ): Promise<ServerResponse> => {
    setIsMovingFood(true);

    const token = await getToken();

    try {

      // destroy food on current meal
       await api.delete(`/foods/${food.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //post food on other meal
      const body: CreateFood = {
        meal_id: meal_id,
        name: food.name,
        calories: food.calories,
        quantity: food.quantity,
        grams: food.grams,
        food_id: food.food_id,
      };

      const req = await api.post("/foods", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        data: req.data,
      };
    } catch (error) {
      console.log("Erro movendo alimento: ", error);
      return {
        error: "Erro movendo alimento!",
      };
    } finally {
      setIsMovingFood(false);
    }
  };

  const deleteFood = async (food_id: number): Promise<ServerResponse> => {

    const token = await getToken();

    try {

      await api.delete(`/foods/${food_id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        data: 'Alimento deletado com sucesso!'
      }
      
    } catch (error) {

      console.log('Erro deletando alimento: ', JSON.stringify(error));
      
      return {
        error:'Erro deletando alimento!'
      }
    }

  }

  const getTotalCalories = async (date?:string) => {

    const meals = await getMeals(date);

    const allMeals = meals.data as Meal[]

    const total = allMeals.reduce((acc,meal)=> acc += meal.total_calories,0)

    setTotalCalories(total)

  }


  return {
    postFood,
    createMeals,
    getMeals,
    patchFood,
    isFetchingMeals,
    isPostingFood,
    isPatchingFood,
    moveFood,
    isMovingFood,
    deleteFood,
    totalCalories,
    getTotalCalories
  };
};
