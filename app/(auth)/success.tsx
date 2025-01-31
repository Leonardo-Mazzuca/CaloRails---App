


import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import Title from '@/components/title'
import Button from '@/components/button'
import { router } from 'expo-router'

const Success = () => {

  return (

    <View className='h-screen flex items-center justify-between py-10'>

        <View className='flex items-center justify-center' style={{paddingHorizontal:20}}>

            <Image
                source={images.congratiulations}
            />


            <Title
                title='Tudo certo!'
                wheight='normal'
                size='md'
                className='text-p-blue'
            />
            
            <Text className='text-center text-gray-400 font-medium text-md my-3'>
                Agora você pode comecar a cuidar da sua saude, e cuidar do seu corpo. Aproveite
                todas as refeições.
            </Text>

       

        </View>

        <Button
            className='w-[60%] mt-10'
            title='Continuar'
            onPress={()=>router.push('/sign-in')}
        />

    </View>

  )
}

export default Success