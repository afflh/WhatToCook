import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RecipeListScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { recipes } = route.params;

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.recipeItem}
            onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
        >
            <Text style={styles.title}>{item.strMeal}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#3778E2" />
            </TouchableOpacity>

            <FlatList
                data={recipes}
                keyExtractor={(item) => item.idMeal.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
        fontSize: 18,
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
        marginTop: 20,
        marginBottom: 5
    }
});

export default RecipeListScreen;
