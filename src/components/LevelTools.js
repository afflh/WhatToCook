import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LevelTools = () => {
    const [selectedTools, setSelectedTools] = useState({});

    const tools = [
        'Easy', 'Medium', 'Hard'
    ];

    const toggleTool = (tool) => {
        setSelectedTools(prev => ({
            ...prev,
            [tool]: !prev[tool]
        }));
    };

    return (
        <View style={styles.container}>
            {tools.map((tool, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.button, selectedTools[tool] ? styles.selected : styles.unselected]}
                    onPress={() => toggleTool(tool)}
                >
                    <Text style={styles.text}>{tool}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
        margin: 0
    },
    button: {
        padding: 8,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    selected: {
        backgroundColor: '#e0e0e0'  // Light gray color when selected
    },
    unselected: {
        backgroundColor: 'white'
    },
    text: {
        textAlign: 'center',
        color: '#333'
    }
});

export default LevelTools;
