import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Dropdown = ({ options, onSelect, title }) => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={() => setVisible(true)} style={styles.dropdownButton}>
                <Text style={styles.dropdownButtonText}>{title || "Select an option"}</Text>
            </TouchableOpacity>
            <Modal
                visible={visible}
                transparent={true}
                onRequestClose={() => setVisible(false)}
                animationType="fade">
                <TouchableOpacity style={styles.modalContainer} onPress={() => setVisible(false)}>
                    <View style={styles.modalContent}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.optionStyle}
                                onPress={() => {
                                    onSelect(option.value);
                                    setVisible(false);
                                }}>
                                <Text style={styles.textStyle}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        marginBottom: 10,
    },
    dropdownButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        justifyContent: 'center', // Ensures the text aligns center vertically if needed
    },
    dropdownButtonText: {
        fontSize: 14,
        textAlign: 'left', // Aligned text to the left
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    optionStyle: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 16,
    },
});

export default Dropdown;
