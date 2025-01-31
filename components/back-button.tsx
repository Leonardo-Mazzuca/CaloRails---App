
import { TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';

const BackButton = () => {



  return (

    <TouchableOpacity onPress={()=>router.back()} className=' flex items-center justify-center' style={{borderRadius:100,width:40,height:40}}>
        <AntDesign name="arrowleft" size={28} color="#67CFCF" />
    </TouchableOpacity>

  )
}

export default BackButton