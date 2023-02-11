import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const bruschettaImage = require('./images/bruschetta.png')

function HomeScreen({ navigation }){
  const [numIngredients, setNumIngredients] = useState(0);
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>Bruschetta Recipe</Text>
      <Image style={styles.imageContainer} source={bruschettaImage} />
      <TextInput style={styles.textBox} 
        placeholder="Enter the Number of Servings"
        onChangeText={input => setNumIngredients(input)}
      />
      <Pressable style={styles.button} onPress={() => {
        navigation.navigate('Recipe', {
          plumTomatoes: numIngredients * 4,
          basilLeaves: numIngredients * 6,
          garlicCloves: numIngredients * 3,
          oliveOil: numIngredients * 3,
        });
      }}>
        <Text style={styles.buttonText}>View Recipe</Text>
      </Pressable>
      <StatusBar style="light" />
    </View>
  );
}

function RecipeScreen({ route }){
  const { plumTomatoes } = route.params;
  const { basilLeaves } = route.params;
  const { garlicCloves } = route.params;
  const { oliveOil } = route.params;
  return (
    <View style={styles.recipeContainer}>
      <Text style={styles.title}>Bruschetta</Text>
      <Text style={styles.heading}>Ingredients</Text>
      <Text style={styles.items}>
        {JSON.stringify(plumTomatoes)} plum tomatoes
      </Text>
      <Text style={styles.items}>
        {JSON.stringify(basilLeaves)} basil leaves
      </Text>
      <Text style={styles.items}>
        {JSON.stringify(garlicCloves)} garlic cloves, chopped
      </Text>
      <Text style={styles.items}>
        {JSON.stringify(oliveOil)} TB olive oil
      </Text>
      <Text style={styles.heading}>Directions</Text>
      <Text style={styles.items}>
        Combine the ingredients. Add salt to taste.
        Top French bread slices with mixture
      </Text>
      <StatusBar style="light" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} 
          options={{title: 'Healthy Recipes'}}
        />
        <Stack.Screen style={styles.header} name="Recipe" component={RecipeScreen} 
          options={{title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
  },
  imageContainer: {
    marginTop: 20,
  },
  textBox: {
    height: 60,
    fontSize: 20,
    padding: 10,
    marginTop: 25,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 20,
    backgroundColor: '#808080',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  heading: {
    fontSize: 35,
    paddingTop: 20,
    paddingLeft: 20,
  },
  items: {
    fontSize: 30,
    paddingHorizontal: 45,
  },
});
