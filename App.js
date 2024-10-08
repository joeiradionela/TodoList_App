import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Task from './components/Task';
import Icon from 'react-native-vector-icons/Feather'; // Feather Icons

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]); // List of tasks
  const [completedTasks, setCompletedTasks] = useState([]); // List of completed task IDs
  const [isEditing, setIsEditing] = useState(null); // State for editing task
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  // Add a new task or update an existing one
  const handleAddTask = () => {
    if (!task) return;

    Keyboard.dismiss();

    const newTask = {
      id: Date.now(), // Unique ID for each task
      text: task,
    };

    if (isEditing !== null) {
      // Confirmation before editing
      Alert.alert(
        'Save Task',
        'Are you sure you want to save this task?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setIsEditing(null), // Cancel editing
          },
          {
            text: 'OK',
            onPress: () => {
              const updatedTasks = taskItems.map((item) =>
                item.id === isEditing ? { ...item, text: task } : item
              );
              setTaskItems(updatedTasks);
              setIsEditing(null); // Reset after editing
              setTask(null);
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      // Add a new task
      setTaskItems([...taskItems, newTask]);
      setTask(null);
    }
  };

  // Toggle task completion
  const handleCheckTask = (id) => {
    if (completedTasks.includes(id)) {
      setCompletedTasks(completedTasks.filter((taskId) => taskId !== id)); // Uncheck
    } else {
      setCompletedTasks([...completedTasks, id]); // Check
    }
  };

  // Edit a task
  const handleEditTask = (id) => {
    const taskToEdit = taskItems.find((item) => item.id === id);
    setTask(taskToEdit.text);
    setIsEditing(id); // Set the task being edited
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    // Confirmation before deleting
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setTaskItems(taskItems.filter((item) => item.id !== id)); // Remove the task
            setCompletedTasks(completedTasks.filter((taskId) => taskId !== id)); // Remove from completed if deleted
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Filter tasks based on the search query
  const filteredTasks = taskItems.filter(item =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>

      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>ToDo Task!</Text>

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search tasks..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />

        <View style={styles.items}>
          {/* Show tasks if available */}
          {filteredTasks.length > 0 ? (
            filteredTasks.map((item) => (
              <Task
                key={item.id}
                text={item.text}
                completed={completedTasks.includes(item.id)} // Check if completed
                onCheck={() => handleCheckTask(item.id)} // Check/uncheck task
                onEdit={() => handleEditTask(item.id)} // Edit task
                onDelete={() => handleDeleteTask(item.id)} // Delete task
              />
            ))
          ) : (
            // Only show "Task not found" if there's a search query and no results
            searchQuery.length > 0 && <Text style={styles.notFoundText}>Task not found</Text>
          )}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={text => setTask(text)}  // Update task input
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            {/* Change the icon to "save" when editing */}
            <Text style={styles.addText}>
              {isEditing !== null ? (
                <Icon name="save" size={24} color="brown" />  // Save icon when editing
              ) : (
                "+"
              )}
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'brown',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: 'brown',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'pink',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'brown',
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
    color: 'brown',
  },
  notFoundText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
