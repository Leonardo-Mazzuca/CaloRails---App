
import Title from '@/components/title'
import { FlatList, TouchableOpacity } from 'react-native'
import { View, Text, SafeAreaView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import CalorieTracker from '@/components/calorie-tracker';
import Recipes from '@/components/recipes';
import DiaryChart from '@/components/diary-chart';
import { useUser } from '@/hooks/useUser';
import LoadingPage from '@/components/loading-page';
import Header from '@/components/header';



const Home = () => {


  const {isLoading} = useUser();


  if(isLoading) {
    return <LoadingPage />
  }

  return (

   <SafeAreaView className='relative flex-1 h-full'>

      <FlatList
        style={{padding:20}}
        ListHeaderComponent={()=> (
          <Header />
        )}
        renderItem={(()=> (
          <View className='min-h-screen my-10'>

              <Title 
                title='Hoje'
              />

              <CalorieTracker />

              <Recipes />

              <DiaryChart />


          </View>
        ))}
        data={[{key: 1}]}
      />
    
   </SafeAreaView>

  )
  
}

export default Home