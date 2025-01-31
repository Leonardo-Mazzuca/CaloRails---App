


import { View, Text } from 'react-native'
import React from 'react'
import { CircularProgressBase } from 'react-native-circular-progress-indicator'

const NutritionItem = ({
  nutrient,
  value,
  percent,
  color
}:{
  nutrient: string;
  value: string | number;
  percent: number,
  color: string
}) => {
  return (
    <View className='items-center justify-center gap-1'>

        <Text>
          {percent.toFixed(1)}%
        </Text>

        <Text style={{color: color}} className='text-xl text-gray-600 font-semibold'>
          {value}g
        </Text>



          <Text className='text-md text-gray-500 font-normal'>
            {nutrient}
          </Text>


    </View>
    
  )
}


const FoodMacrosCircles = ({food}:{food:FoodNutrition}) => {

  const props = {
    activeStrokeWidth: 10,
    inActiveStrokeWidth: 12,
    inActiveStrokeOpacity: 0.2
  };

  const kcal = food.calories
  const carbs = food?.totalDaily?.CHOCDF.quantity;
  const proteins = food?.totalDaily?.PROCNT.quantity;
  const fats = food?.totalDaily?.FAT.quantity;

  const totalCarbPercent = (carbs/kcal)*100

  const totalProtPercent = (proteins/kcal)*100

  const totalFatPercet = (fats/kcal)*100


  return (
    <View 
      style={{paddingHorizontal:20}} 
      className='my-5 flex-row gap-5 items-center w-full'
    >

      <View>


     <CircularProgressBase
        {...props}
        value={totalCarbPercent}
        radius={50}
        activeStrokeColor={'#e84118'}
        inActiveStrokeColor={'#e84118'}
        
      >

        <CircularProgressBase
          {...props}
          value={totalProtPercent}
          radius={35}
          activeStrokeColor={'#badc58'}
          inActiveStrokeColor={'#badc58'}
          
        >
          <CircularProgressBase
            {...props}
            value={totalFatPercet}
            radius={15}
            activeStrokeColor={'#18dcff'}
            inActiveStrokeColor={'#18dcff'}
          />

        </CircularProgressBase>

      </CircularProgressBase> 

      </View>

      <View className='flex-row justify-between flex-1 items-center gap-3'>

          <NutritionItem 
            value={food!.totalDaily.CHOCDF.quantity.toFixed(1)}
            nutrient='Carb'
            percent={totalCarbPercent}
            color="#e84118"
          />


          <NutritionItem 
            value={food!.totalDaily.PROCNT.quantity.toFixed(1)}
            nutrient='Proteínas'
            percent={totalProtPercent}
            color="#badc58"
          />

          <NutritionItem 
            value={food!.totalDaily.FAT.quantity.toFixed(1)}
            nutrient='Gorduras'
            percent={totalFatPercet}
            color="#18dcff"
          />

      </View>

    </View>

  )
}

export default FoodMacrosCircles