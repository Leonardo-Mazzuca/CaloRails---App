

import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'

const Empty = () => {

  return (

    <View className='flex w-full mx-auto items-center justify-center'>
      
      <Image
        source={images.noFood}
        resizeMode='cover'
        className='w-[100px] my-3 h-[100px]'
      />    
      <Text className="text-gray-400 font-semibold">
        Nenhuma receita foi adicionada!
      </Text>

    </View>

  )
}

export default Empty