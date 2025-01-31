


import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {  useEffect, useState } from 'react'
import clsx from 'clsx'
import images from '@/constants/images'
import { router } from 'expo-router'


const RecipeCard = ({recipe,className,index}:{recipe:Recipe,className?:string,index?:number}) => {


  return (
    
    <TouchableOpacity 
    //@ts-ignore
    onPress={()=>router.push(`/(recipe)/${recipe.id}`)}
    style={{
        borderRadius:20,
        width:200,
        marginRight:15,
        backgroundColor: index! % 2 === 0 ? '#D6F7F7' : '#FFDDDD' 
    }} 
        className={clsx('shadow-lg relative flex-1 p-3 flex items-center justify-center',className)}
    >


        <View>

            <Image
                style={{borderRadius:20}}
                className='w-[100px] my-3 h-[100px]'
                resizeMode='cover'
                source={recipe.picture === null ? images.noImageRecipe : {uri:recipe.picture}}
                alt='Picture of the recipe'

            />

        </View>
        
        <Text ellipsizeMode='tail' numberOfLines={1} style={{fontSize:24}} className='text-xl font-normal text-gray-400'>
            {recipe.name}
        </Text> 

        <Text style={{fontSize:20}} className='text-xl'>
            {recipe.calories.toFixed(1)}kcal
        </Text>
      
    </TouchableOpacity>

  )
}

export default RecipeCard