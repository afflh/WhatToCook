import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    loadUserName(); // Load user name from storage
    getCategories();
    getRecipes(activeCategory);
  }, []);

  const loadUserName = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      if (name !== null) {
        setUserName(name);
      }
    } catch (e) {
      console.error("Failed to load the user's name:", e);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      navigation.replace('LogIn');
    } catch (e) {
      console.error("Failed to logout:", e);
    }
  };

  const handleChangeCategory = async (category) => {
    setActiveCategory(category);
    await getRecipes(category);
  };

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.error('Error fetching categories:', err.message);
    }
    setLoading(false);
  };

  const getRecipes = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.error('Error fetching recipes:', err.message);
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* Header */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image source={require('../../assets/images/profile.png')} style={{ height: hp(5), width: hp(5) }} />
          <TouchableOpacity onPress={handleLogout} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{
              fontSize: hp(2), 
              marginRight: 10, 
              backgroundColor: 'cornflowerblue',
              color: 'white', 
              paddingVertical: 5, 
              paddingHorizontal: 15, 
              borderRadius: 10 
            }}>Logout</Text>
            <BellIcon size={hp(4)} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }}>Hello, {userName || 'Guest'}!</Text>
          <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">
            Search recipes by <Text className="text-blue-400">ingredients</Text>
          </Text>
        </View>

        {/* Search Button */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: "#5CACEE",
            borderRadius: 30,
            margin: 10,
            marginBottom: 15,
            marginHorizontal: 4,
            paddingVertical: 10,
          }}
          onPress={() => navigation.navigate('RecipeSearch')}
        >
          <Text style={{ color: 'white', flex: 1, fontSize: hp(2), textAlign: 'center' }}>
            Click to search any recipe!
          </Text>
        </TouchableOpacity>

        {/* Categories */}
        {categories.length > 0 && (
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        )}

        {/* Recipes */}
        <Recipes meals={meals} categories={categories} />
      </ScrollView>
    </View>
  );
}
