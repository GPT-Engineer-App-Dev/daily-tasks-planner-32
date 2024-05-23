import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const saveEditing = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editingText } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} w="100%">
        <Heading as="h1" size="2xl" mb={6}>
          Todo App
        </Heading>
        <Flex w="100%" mb={4}>
          <Input
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            mr={2}
          />
          <Button onClick={addTask} colorScheme="purple">
            Add Task
          </Button>
        </Flex>
        <Box w="100%">
          <List spacing={3}>
            {tasks.map((task, index) => (
              <ListItem
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                bg="gray.100"
                p={2}
                borderRadius="md"
              >
                {editingIndex === index ? (
                  <Input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    mr={2}
                  />
                ) : (
                  <Checkbox
                    isChecked={task.completed}
                    onChange={() => toggleTaskCompletion(index)}
                    mr={2}
                  >
                    <Text as={task.completed ? "s" : ""}>{task.text}</Text>
                  </Checkbox>
                )}
                <Flex>
                  {editingIndex === index ? (
                    <IconButton
                      aria-label="Save task"
                      icon={<FaSave />}
                      size="sm"
                      colorScheme="green"
                      onClick={() => saveEditing(index)}
                      mr={2}
                    />
                  ) : (
                    <IconButton
                      aria-label="Edit task"
                      icon={<FaEdit />}
                      size="sm"
                      colorScheme="blue"
                      onClick={() => startEditing(index)}
                      mr={2}
                    />
                  )}
                  <IconButton
                    aria-label="Delete task"
                    icon={<FaTrash />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => deleteTask(index)}
                  />
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
      <Divider mt={10} />
      <Box as="footer" py={4} textAlign="center" w="100%" bg="gray.800" color="white" mt={10}>
        <Text fontSize="sm">
          © 2023 Todo App
        </Text>
      </Box>
    </Container>
  );
};

export default Index;