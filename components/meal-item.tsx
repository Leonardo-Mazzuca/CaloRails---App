import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import { router } from "expo-router";
import { getMealName } from "@/constants";
import { useEffect, useState } from "react";
import Title from "./title";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMeal } from "@/hooks/useMeal";

const MealItem = ({ meal }: { meal: Meal }) => {


  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodOnMeal | null>(null)
  const [moveToModalOpen, setMoveToModalOpen] = useState(false)

  const {getMeals,moveFood, deleteFood} = useMeal();
  const [meals, setMeals] = useState<Meal[]>([])

  const onMoveFood = async (meal_id:number) => {


    if(!selectedFood) return;


    const {data,error} = await moveFood(selectedFood,meal_id)

    if(data){

        router.replace('/diary')
        
    } else {
        Alert.alert(error!)
    }

  }

  const onDeleteFood = async () => {

    if(!selectedFood) return

    const {data,error} = await deleteFood(selectedFood?.id);

    if(data){
        router.replace('/diary')
    } else {
        Alert.alert(error!)
    }
  }

  useEffect(()=> {

    const fetchMeals = async () => {
      const {data} = await getMeals();
      if(data){
        setMeals(data)
      }
    }

    fetchMeals()

  },[])

  return (

    <View className="my-3 py-2" style={{ backgroundColor: "#D6F7F7" }}>
      <View className="flex-row p-3 justify-between items-center">
        <Text className="text-gray-700 text-xl font-semibold">
          {getMealName(meal.meal_type as number)}
        </Text>

        <Text className="text-lg text-gray-500 font-bold">
          {meal.total_calories || 0}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#67CFCF",
          width: "100%",
          height: 3,
        }}
      />

      {meal.foods &&
        meal.foods.length > 0 &&
        meal.foods.map((food, index) => (
          <TouchableOpacity
            onLongPress={() => {
                setSelectedFood(food)
                setOpen(true)
            }}
            onPress={() =>
              router.push(
                `/diary/${meal.meal_type}/${food.food_id}?meal_id=${meal.id}&meal_type=${meal.meal_type}&database_food_id=${food.id}`
              )
            }
            className="px-3 py-2 bg-s-blue"
            key={index}
          >
            <View className="flex-row justify-between gap-5">
              <Text className="text-white font-semibold text-md">
                {food.name}
              </Text>
              <Text className="text-white font-semibold">{food.calories}</Text>
            </View>
            <View>
              <Text className="text-gray-600 font-normal">
                {food.name}, {food.grams.toFixed(1)}, gramas
              </Text>
            </View>
          </TouchableOpacity>
        ))}

      <TouchableOpacity
        // @ts-ignore
        onPress={() =>
          router.push(`/diary/${meal.meal_type}?meal_id=${meal.id}`)
        }
        className="ml-2 my-2"
      >
        <Text style={{ color: "#9ca3af" }} className="text-lg ">
          Adicionar alimento
        </Text>
      </TouchableOpacity>

      <Modal
          visible={open}
          animationType='fade'
          transparent
          
        >
          <TouchableWithoutFeedback onPress={()=>setOpen(false)}>
  
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
  
              <View
                style={{
                  width:'90%',
                  backgroundColor:'#fff',
                  padding: 20,
                  borderRadius:15
                }}
              >
  
  
                 <Title 
                  title='Diário' 
                  size='xl'
                 />

                <View className="my-3 gap-3">

                    <TouchableOpacity 
                        onPress={onDeleteFood}
                        className="flex-row items-center justify-between" 
                        style={{backgroundColor: '#B82132', padding: 10, borderRadius: 5, width:200}}>
                            <Text className="text-white font-bold">
                                Excluir registro
                            </Text>
                            <EvilIcons name="trash" size={32} color="#fff"
                         />
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=>{
                        setMoveToModalOpen(true)
                        setOpen(false)
                    }}
                    className="flex-row items-center justify-between" 
                    style={{backgroundColor: '#67CFCF', padding: 10, borderRadius: 5, width:200}}>
                        <Text className="text-white font-bold">
                            Mover para
                        </Text>
                        <Ionicons name="arrow-redo-outline" size={28} color="#FFF" />
                    </TouchableOpacity>

                </View>
            
              </View>
  
            </View>
  
          </TouchableWithoutFeedback>

        </Modal>

      <Modal
          visible={moveToModalOpen}
          animationType='fade'
          transparent
          
        >
          <TouchableWithoutFeedback onPress={()=>setMoveToModalOpen(false)}>
  
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
  
              <View
                style={{
                  width:'90%',
                  backgroundColor:'#fff',
                  padding: 20,
                  borderRadius:15
                }}
              >
  
  
                 <Title 
                  title='Mover para...' 
                  size='xl'
                 />

                <View className="my-3 gap-3">


                    {meals?.map((meal,index)=>(

                        <TouchableOpacity onPress={()=>onMoveFood(meal.id as number)} key={index}>
                            <Text className="text-gray-600 text-lg">
                                {getMealName(meal.meal_type as number)}
                            </Text>
                        </TouchableOpacity>


                    ))}

                </View>
            
              </View>
  
            </View>
  
          </TouchableWithoutFeedback>

        </Modal>
      
    </View>
  );
};

export default MealItem;
