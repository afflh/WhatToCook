import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Dropdown from '../components/Dropdown';
import KitchenTools from '../components/KitchenTools';
import LevelTools from '../components/LevelTools';
import CuisineTools from '../components/CuisineTools';

const RecipeSearchScreen = () => {
    const [ingredient, setIngredient] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchInitiated, setSearchInitiated] = useState(false);
    const navigation = useNavigation();

    const [mealType, setMealType] = useState('');

    const mealOptions = [
        { label: 'Breakfast', value: 'Breakfast' },
        { label: 'Lunch', value: 'Lunch' },
        { label: 'Dinner', value: 'Dinner' }
    ];

    const [servingSize, setServingSize] = useState('');

    const servingOptions = [
        { label: '1 Serving', value: '1' },
        { label: '2 Servings', value: '2' },
        { label: '3 Servings', value: '3' },
        { label: '4 Servings', value: '4' },
        { label: '5 Servings', value: '5' },
        { label: '>6 Servings', value: '6+' }
    ];

    const fetchRecipes = async () => {
        setSearchInitiated(true);
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
        
        setLoading(true);
        try {
            const response = await axios.get(url);
            const fetchedRecipes = response.data.meals || [];
            setRecipes(fetchedRecipes);

            if (fetchedRecipes.length > 0) {
                // Navigate to the RecipeList screen only if there are results
                navigation.navigate('RecipeList', { recipes: fetchedRecipes });
            } else {
                // Display "No results found" on the current screen
                // alert('No results found. Please try another ingredient.');
                <Text style={styles.noResultsText}>
                        There is no result for the ingredients you search.
                    {/* <Button style={styles.buttonNoresult} title="Enter Another Ingredient" onPress={() => navigation.goBack()} color="#3778E2" /> */}
                </Text>
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setRecipes([]);
        } finally {
            setLoading(false);
        }
    };

    // const renderItem = ({ item }) => (
    //     <TouchableOpacity 
    //         style={styles.recipeItem}
    //         onPress={() => navigation.navigate('RecipeDetail', {...item})}
    //     >
    //         <Text style={styles.title}>{item.strMeal}</Text>
    //     </TouchableOpacity>
    // );

    // const renderHeader = () => (
    //     <View>
    //         {/* <Animated.View entering={FadeIn} style={styles.headerControls}> */}
    //             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    //                 <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#3778E2" />
    //             </TouchableOpacity>
    //         {/* </Animated.View> */}
    //         <TextInput
    //             style={styles.input}
    //             placeholder="Enter Main Ingredient"
    //             value={ingredient}
    //             onChangeText={setIngredient}
    //         />
    //         <Dropdown 
    //             options={mealOptions}
    //             onSelect={setMealType}
    //             title={mealType || "Select Meal Type"}
    //         />
            
    //         <Dropdown
    //             options={servingOptions}
    //             onSelect={setServingSize}
    //             title={servingSize || "Select Serving Size"}
    //         />

    //         <Text style={styles.headertools}>Choose Your Tools</Text>
    //         <KitchenTools />
    //         <Text style={styles.headertools}>Choose Your Level</Text>
    //         <LevelTools />
    //         <Text style={styles.headertools}>Choose Cuisine</Text>
    //         <CuisineTools />
    //         <Button title="Search Recipes" onPress={fetchRecipes} color="#3778E2" />
    //     </View>
    // );
    

    // return (
        



    //     <View style={styles.container}>
    //             {loading ? (
    //                 <Text>Loading...</Text>
    //             ) : searchInitiated && recipes.length === 0 ? (
    //                 <Text style={styles.noResultsText}>
    //                     There is no result for the ingredients you search.
    //                 {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    //                     <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#3778E2" />
    //                 </TouchableOpacity> */}
    //                 <Button style={styles.buttonNoresult} title="Enter Another Ingredient" onPress={() => navigation.goBack()} color="#3778E2" />
    //                 </Text>
    //             ) : (
    //                 <FlatList
    //                     data={recipes}
    //                     keyExtractor={item => item.idMeal.toString()}
    //                     renderItem={renderItem}
    //                     ListHeaderComponent={renderHeader}
    //                     // ListEmptyComponent={<Text style={styles.noResultsText}>No results</Text>}
    //                 />
    //             )}
    //     </View>
    // );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#3778E2" />
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Enter Main Ingredient"
                value={ingredient}
                onChangeText={setIngredient}
            />
            <Dropdown 
                options={mealOptions}
                onSelect={setMealType}
                title={mealType || "Select Meal Type"}
            />
            
            <Dropdown
                options={servingOptions}
                onSelect={setServingSize}
                title={servingSize || "Select Serving Size"}
            />

            <Text style={styles.headertools}>Choose Your Tools</Text>
            <KitchenTools />
            <Text style={styles.headertools}>Choose Your Level</Text>
            <LevelTools />
            <Text style={styles.headertools}>Choose Cuisine</Text>
            <CuisineTools />
            <Button title="Search Recipes" onPress={fetchRecipes} color="#3778E2" />
            {loading ? (
                    <Text style={styles.loading}>Loading...</Text>
                ) :  searchInitiated && recipes.length === 0 ? (
                    <Text style={styles.noResultsText}>
                        There is no result for the ingredients you search.
                    {/* <Button style={styles.buttonNoresult} title="Enter Another Ingredient" onPress={() => navigation.goBack()} color="#3778E2" /> */}
                    </Text>
                ) : (
                     <FlatList
                        data={recipes}
                        keyExtractor={item => item.idMeal.toString()}
                        // renderItem={renderItem}
                    />
        )}
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 80,
        backgroundColor: '#fff'
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10
    },
    recipeItem: {
        marginVertical: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18
    },
    loading:{
        marginTop: 10
    },
    noResultsText: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        fontSize: 18,
        color: 'gray'
    },
    headertools:{
        fontWeight: 'bold',
        fontSize: 20
    },
    backButton: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            // position: 'absolute',
            top: 10,
            // left: 10,
            right: 0,
            padding: 10,
            marginTop: -20,
            marginBottom: 20
    }
});

export default RecipeSearchScreen;