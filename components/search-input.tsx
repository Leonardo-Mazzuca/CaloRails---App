

import { View, TextInputProps, TextInput } from 'react-native'
import Fontisto from '@expo/vector-icons/Fontisto';

type Props = {

} & TextInputProps
const SearchInput = ({...rest}:Props) => {

  return (

    <View 
    className='relative'
    style={{
        borderColor:'#31D6D6',
        borderWidth:1,
        borderRadius: 50
    }}>
      
      <View style={{
          position:'absolute',
          left: 10,
          top: 8
        }}>

         <Fontisto name="search" size={20} color="gray" />

        </View>

      <TextInput 
        placeholder='Pesquisar por alimento...'
        style={{
            paddingLeft: 40
        }}
        autoFocus
        {...rest}
        
      />


    </View>

  )
}

export default SearchInput