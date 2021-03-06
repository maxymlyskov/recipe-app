import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import RecipeCard from "../../components/RecipeCard";
import ActivityIndicator from "../../components/ActivityIndicator";
import {
  useFilterIncludeIngredientsQuery,
  useFilterMinCaloriesQuery,
} from "../../store/recipes/searchApi";
import { useGetSearchedQuery } from "../../store/saved/getSearched";

export default function Meals({ navigation }) {
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const calories = useSelector((state) => state.user.calories);
  const defaultRecipes = useFilterMinCaloriesQuery(parseInt(calories / 4));
  let titleFirst;
  let titleSecond;
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array.filter(function (item, pos) {
      return array.indexOf(item) == pos;
    });
  }
  // getting saved recipes from account
  const saved = useGetSearchedQuery({ refetchOnMountOrArgChange: true });
  useEffect(() => {
    if (saved.data) {
      if (saved.data.length > 1) {
        titleFirst = saved.data[0].title.split(" ");
        titleSecond = saved.data[1].title.split(" ");
        setTitle1(titleFirst[0]);
        setTitle2(titleSecond[0]);
      }
    }
  }, [saved.data]);
  let firstRecipe = useFilterIncludeIngredientsQuery(title1, {
    refetchOnMountOrArgChange: true,
  });
  const secondRecipe = useFilterIncludeIngredientsQuery(title2, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      <ActivityIndicator visible={!firstRecipe.data && !secondRecipe.data} />
      <View>
        {firstRecipe.data && secondRecipe.data ? (
          <FlatList
            data={shuffle(
              firstRecipe.data.results.concat(secondRecipe.data.results)
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RecipeCard
                title={item.title}
                image={{ uri: item.image }}
                onPress={() => navigation.navigate("RecipeDetailsScreen", item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          defaultRecipes.data && (
            <FlatList
              data={defaultRecipes.data.results}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <RecipeCard
                  title={item.title}
                  image={{ uri: item.image }}
                  onPress={() =>
                    navigation.navigate("RecipeDetailsScreen", item)
                  }
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          )
        )}
      </View>
    </>
  );
}
