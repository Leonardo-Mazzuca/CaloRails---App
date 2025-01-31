

import { Text } from 'react-native'
import React from 'react'
import clsx from 'clsx'

type Props = {
    title: string,
    wheight? : 'normal' | 'bold' | 'semibold' | 'medium'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
} & 
React.ComponentProps<typeof Text>

const Title = ({title,wheight = "semibold",size,className,...rest}:Props) => {

  const aditionalClasses = `
    ${size && `text-${size}`}
    ${wheight && `font-${wheight}`}
    
  `

  return (
    
      <Text
        className={clsx(aditionalClasses,className,'text-4xl text-p-black')}
        numberOfLines={1}
        ellipsizeMode='tail'
        {...rest}
      >
        {title}
      </Text>
   
  )
}

export default Title