import { FlatList, RefreshControl, View } from "react-native";
import React, { useState } from "react";
import Title from "./title";
import { useRecipes } from "@/hooks/useRecipes";
import RecipeCard from "./recipe-card";
import Empty from "./empty";

const Recipes = () => {

  const { recipes, isLoading, refetch } = useRecipes();

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = async () => {
    setIsRefreshing(true);

    await refetch();

    setIsRefreshing(false);
  };

  if(isLoading) {
    return null
  }

  return (

    <View className="my-3">

      <Title title="Receitas que podem te interessar" size="xl" className="my-3"/>

      <FlatList 
        data={recipes}
        refreshControl={
            <RefreshControl 
                refreshing={isRefreshing}
                onRefresh={onRefresh}
            />
        }
        horizontal={recipes.length>0}
        ListEmptyComponent={<Empty />}
        keyExtractor={(item)=>String(item.id)}
        renderItem={({item,index})=> (

            <RecipeCard 
                index={index}
                recipe={item}

            />

        )}
      />


    </View>

  );
};

export default Recipes;
