



import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const FoodCard = ({food,onPress}:{food:Food,onPress?: () => void}) => {

  return (
    <TouchableOpacity onPress={onPress} style={{paddingVertical:20, paddingHorizontal:10}} className='px-3 bg-white'>

      <View className='flex-1 flex-row justify-between items-center'>
        <View style={{overflow:'hidden'}}>
            <Text className='text-ellipsis text-gray-600 font-semibold text-md'>
                {food.label}
            </Text>
            <Text className='text-ellipsis text-gray-500 font-normal text-md'>
                {food.knownAs}, {food.nutrients.ENERC_KCAL.toFixed(1)}kcal
            </Text>
        </View>
        <Text className='text-gray-400 font-semibold'>
            {food.nutrients.ENERC_KCAL.toFixed(1)}
        </Text>
      </View>

    </TouchableOpacity>
  )
}

export default FoodCard