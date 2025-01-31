



import { View, TextInput, TextInputProps, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import clsx from 'clsx'
import Entypo from '@expo/vector-icons/Entypo';

type Props = {

  label:string
  type?:'default' | 'password'
  error?:string

}& TextInputProps

const FormField = ({
  className,
  type="default",
  error,
  label,
  ...rest
}:Props) => {


  const [showPassword, setShowPassword] = useState(false)

  
  return (
  
    <View className='my-3 relative'>

      <Text className='text-gray-600 font-semibold my-2 text-sm'>
        {label}
      </Text>
      <TextInput 
        
        className={clsx('border-b border-gray-300 ',className)}
        secureTextEntry={!showPassword && type === 'password'}
        {...rest}
      />

        {type === 'password' && (

          <TouchableOpacity className='absolute right-2 bottom-1.5'>
            
            {!showPassword ? (
              <Entypo onPress={() => setShowPassword(!showPassword)} name="eye" size={24} color="gray" />
            ) : (
              <Entypo onPress={() => setShowPassword(!showPassword)} name="eye-with-line" size={24} color="gray" />
            )}
          
          </TouchableOpacity>

        )}

        {error && (
          <Text className='text-red-600 font-semibold my-2 text-sm'>
            {error}
          </Text>
        )}


    </View>
  )
}

export default FormField