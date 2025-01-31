


import Button from '@/components/button'
import FormField from '@/components/form-field'
import Title from '@/components/title'
import images from '@/constants/images'
import { useAuth } from '@/hooks/useAuth'
import { signInSchema, SignInType } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import { Alert, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {

  const {signIn,storageToken} = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false)


  const {handleSubmit,control,formState:{errors}} = useForm<SignInType>({
    mode:'all',
    criteriaMode: 'all',
    defaultValues: {
      email:'',
      password: ''
    },
    resolver: zodResolver(signInSchema)
  })
  const onSignIn = async (payload:SignInType) => {

    setIsSubmitting(true)
    const {data,error} = await signIn(payload)

    if(data){
      
      await storageToken(data.token)

      router.push('/(tabs)')
      
    } else {
      Alert.alert(error!)
    }
    setIsSubmitting(false)

  }
  return (

    <SafeAreaView className='h-full flex-1'>

      <ScrollView style={{
        height: '100%',
        paddingHorizontal: 20,
      }} >

          <View  className='flex my-10 items-center justify-center'>

            <Image 
              source={images.appLogo}
              className='w-[100px] h-[100px] object-cover'
              resizeMode='contain'
            />

          </View>

          <View className='my-5' style={{gap:5}}>

            <Title
              title='Entrar'
              className='mt-5'
              wheight='normal'
            />  

            <Text className='text-gray-500 text-md font-light'>
              Entre na sua conta e comece a registrar suas calorias!
            </Text>

          </View>

          <View style={{gap:5}}>

            <Controller
              control={control}
              name='email'
              render={({field})=> (
                <FormField
                  label="Email"
                  placeholder='Digite seu email'
                  onChangeText={(e)=> {
                    field.onChange(e)
                  }}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller 
              control={control}
              name='password'
              render={({field})=> (
                <FormField
                  type="password"
                  label="Senha"
                  onChangeText={(e)=> {
                    field.onChange(e)
                  }}
                  error={errors.password?.message}
                />

              )}
            
            />

            <Link className='ms-auto my-2 underline text-p-blue' href={'/'}>
              Esqueceu a senha?
            </Link>
            

            <Button
              title='Entrar'
              className='my-3'
              onPress={handleSubmit(onSignIn)}
              isLoading={isSubmitting}
            />

            <View className='flex flex-row justify-center items-center gap-5'>
              <View className='w-1/3 bg-gray-300 h-[1px]'/>
              <Text className='text-gray-400'>
                ou
              </Text>
              <View className='w-1/3 bg-gray-300 h-[1px]'/>
            </View>

            <View className='flex-row justify-center items-center '>
              <Text className='font-normal text-gray-500'>
                Não tem uma conta?
              </Text>
                <Link className='my-2 ms-1 underline text-p-blue' href={'/sign-up'}>
                Criar conta
              </Link>
            </View>


          </View>


      </ScrollView>


    </SafeAreaView>
    
  )
}

export default SignIn