import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Switch, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

let taskId = 0;

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [showCompleted, setShowCompleted] = useState(true);

  const handleAddTask = () => {
    if (task) {
      if (editIndex !== -1) {
        const updatedTasks = tasks.map((t, index) => index === editIndex ? { ...t, text: task } : t);
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasks([...tasks, { id: taskId++, text: task, completed: false }]);
      }
      setTask('');
    }
  };

  const handleEditTask = (index) => {
    if (!tasks[index].completed) {
      setTask(tasks[index].text);
      setEditIndex(index);
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (editIndex !== -1 && tasks[editIndex].id === id) {
      setTask('');
      setEditIndex(-1);
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = showCompleted ? tasks : tasks.filter(task => !task.completed);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.heading}>Todo App</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter task"
            value={task}
            onChangeText={setTask}
          />
          <TouchableOpacity onPress={handleAddTask}>
            <Icon name={editIndex !== -1 ? "edit" : "add"} size={30} color="#007BFF" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredTasks}
          renderItem={({ item }) => (
            <View style={styles.task}>
              <Switch
                value={item.completed}
                onValueChange={() => handleToggleComplete(item.id)}       
                trackColor={{ false: '#888', true: '#007BFF' }} 
              />
              <Text style={[styles.itemList, item.completed && styles.completedTask]}>{item.text}</Text>
              <View style={styles.taskButtons}>
                <TouchableOpacity onPress={() => handleEditTask(tasks.findIndex(t => t.id === item.id))} disabled={item.completed}>
                  <Icon name="edit" size={24} color={item.completed ? '#ccc' : '#007BFF'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                  <Icon name="delete" size={24} color="#FF0000" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setShowCompleted(!showCompleted)}>
          <Text style={styles.buttonText}>{showCompleted ? 'Hide Completed' : 'Show Completed'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearCompletedTasks}>
          <Text style={styles.buttonText}>Clear Completed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFD7B4',
  },
  scrollView: {
    paddingBottom: 80, // Adjust to prevent overlap with buttons
  },
  heading: {
    backgroundColor: 'orange',
    textAlign: 'center',
    fontSize: 24,
    padding: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'red',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  itemList: {
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskButtons: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default App;
