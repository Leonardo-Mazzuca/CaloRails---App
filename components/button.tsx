


import clsx from 'clsx'
import React from 'react'
import {  ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import {Button as ReactNativeButton} from 'react-native'

type Props = {
    className?:string
    textClasses?:string
    isLoading?:boolean
    variant?: 'text' | 'icon'
    textColor?:string
} & React.ComponentProps<typeof ReactNativeButton>

const Button = ({title,className,onPress,textClasses,variant,isLoading,...rest}:Props) => {
 
 
   const aditionalClasses = `
    bg-s-blue rounded-[50px] p-3 
    ${variant === 'text' && 'bg-transparent'}
   `

  return (

    <TouchableOpacity
        className={clsx(className, aditionalClasses)}
        onPress={onPress}
        disabled={isLoading}
        {...rest}

    >   

            {!isLoading && (
              <Text className={clsx('font-semibold text-xl text-center ',textClasses, variant === 'text' ? 'text-gray-600' : 'text-white')}>
                  {title}
              </Text>

            )}

            {isLoading && (
              <ActivityIndicator
                size={"small"}
                color={"#FFF"}
              />
            )}

    </TouchableOpacity>

  )
  
}

export default Button