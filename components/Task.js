import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Using Feather icons

const Task = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                {/* Checkable checkbox */}
                <TouchableOpacity style={styles.square} onPress={props.onCheck}>
                    {props.completed ? <Text style={styles.checkmark}>✓</Text> : null}
                </TouchableOpacity>

                {/* Task text */}
                <Text style={[styles.itemText, props.completed && styles.completedText]}>
                    {props.text}
                </Text>
            </View>

            <View style={styles.buttons}>
                {/* Edit button */}
                <TouchableOpacity onPress={props.onEdit}>
                    <Icon name="edit" size={20} color="brown" />
                </TouchableOpacity>

                {/* Delete button */}
                <TouchableOpacity onPress={props.onDelete}>
                    <Icon name="trash-2" size={20} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: 'brown',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        color: 'white',
        fontWeight: 'bold',
    },
    itemText: {
        maxWidth: '80%',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Task;
