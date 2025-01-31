


import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import CircularProgress from 'react-native-circular-progress-indicator';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useMeal } from '@/hooks/useMeal';

const CalorieTracker = () => {
  

  const {isLoading,user} = useUser();


  const {getTotalCalories,totalCalories} = useMeal();
  const [remainCalories, setRemainCalories] = useState(0)

  useEffect(()=> {
    getTotalCalories()
  },[])   

  useEffect(()=> {

    if(totalCalories > 0) {

      const remain = user.total_calories - totalCalories
      
      setRemainCalories(remain)

    } else {

      setRemainCalories(user.total_calories)
      
    }

  },[totalCalories,user.total_calories])

  const total_consumed = totalCalories*100/user.total_calories

  if(isLoading) {
    return <Text>Carregando...</Text>
  }

  return (

    <View 

        className='mt-5 gap-5 p-3 shadow-lg'
        style={{
          padding: 10,
          borderRadius:10,
          backgroundColor: '#D6F7F7'
        }}
      >
      
      <View>

        <Text className='font-semibold text-gray-600 text-xl'>
            Calorias
        </Text>

        <Text className='font-normal text-gray-500 text-sm'>
            Restantes = meta - total consumido
        </Text>

      </View>

      <View className='flex-row justify-between items-center'>

          <View>
            
            <CircularProgress 
              value={total_consumed}
              maxValue={user.total_calories}
              progressValueColor={"#3E423A"}
              activeStrokeColor={"#31D6D6"}
              radius={70}
              titleColor='#3E423A'
              titleFontSize={30}
              titleStyle={{
                fontWeight:800
              }}
              subtitle='Restantes'
              subtitleColor='#3E423A'
              duration={500}
              title={isNaN(remainCalories) ? '...' : remainCalories.toFixed()}
              inActiveStrokeColor={"#dedede"}
              rotation={10}
              showProgressValue={false}
              
            />
            
          </View>

          <View className='gap-5 mb-5 me-10'>

              <View className='flex-row items-center gap-3'>

                <Feather name="flag" size={30} color="gray" />
  
              <View>

                <Text>
                  Meta base
                </Text>
                <Text className='text-xl font-bold'>
                  {user?.total_calories?.toFixed()}
                </Text>

              </View>

            </View>

            <View className='flex-row items-center gap-3'>

              <MaterialCommunityIcons name="food-apple-outline" size={30} color="red" />

              <View>

                <Text>
                  Total consumido 
                </Text>
                <Text className='text-xl font-bold'>
                  {totalCalories}
                </Text>

              </View>


            </View>
          </View>

      </View>

    </View>

  )
}

export default CalorieTracker