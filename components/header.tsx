

import { View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Text } from 'react-native'

const Header = () => {
  return (
    <View 
    className='flex flex-row justify-between items-center'
  >
    <TouchableOpacity style={{
      padding:10,
      borderRadius:100
    }} 
    className='bg-s-blue'
    >
     <AntDesign name="user" size={24} color="white" />
    </TouchableOpacity>

    
    <Text className='text-gray-600 font-bold text-2xl'>
        CaloRails
    </Text>  

    <TouchableOpacity>
    <Ionicons name="notifications-outline" size={24} color="black" />
    </TouchableOpacity>
  </View>
  )
}

export default Header