

import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import images from '../constants/images'
import Button from '@/components/button'
import { sample } from 'lodash'
import AnimatedText from '@/components/animated-text'
import { titles } from '@/constants'
import { router } from 'expo-router'
const RootPage = () => {

  const [title, setTitle] = useState(titles[0]);


  useEffect(() => {

    const interval = setInterval(() => {

      // @ts-ignore
      setTitle(sample(titles))

    }, 3000);
  
    return () => clearInterval(interval);
  }, [titles.length]);


  return (

    <SafeAreaView className='h-full flex-1'>

        <View className='min-h-screen flex flex-col bg-p-blue'>

            <View className='flex items-center justify-center p-10'>

              <Image 
                source={images.mainImage}
                resizeMode='cover'
                alt='Main image'
                className='w-[300px] h-[300px]'
              />

            </View>

            <View className='bg-white px-10 py-16 h-full rounded-tl-[40px] rounded-tr-[40px]'>

  
                <AnimatedText
                  text={title}

                />

                <Text className='my-5 text-gray-500 font-light'>

                  Lorem ipsum dolor sit amet, conse ctetur adipi scing elit. Nibh convallis varius iaculis
                  Lorem ipsum dolor sit amet, conse ctetur adipi scing elit. Nibh convallis varius iaculis

                </Text>


                <View className='flex w-full items-center gap-3 justify-between flex-row'>

                  <Button 
                    title='Entrar'
                    className='w-1/3'
                    onPress={()=>router.push('/sign-in')}
                    
                  />
         
                </View>


            </View>
         
        </View>




        <StatusBar hidden style="auto" />

    </SafeAreaView>

  )

}

export default RootPage