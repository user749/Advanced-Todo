import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Spinner,
  Button,
  Input,
} from "@chakra-ui/react";
import { deleteTodo, editTodo, fetchTodos } from "../redux/actions/todoAction";

export const FetchTodo = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo);
  const { loading, error, todos } = todo;

  const [editedText, setEditedText] = useState("");
  const [editTodoId, setEditTodoId] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  /*
  const showNotification = (todo) => {
    // Check if the end date and alarm hour are selected
    if (todo.endDate && todo.alarmHour) {
      const endDateParts = todo.endDate.split("/");
      const month = parseInt(endDateParts[0]) - 1; // Month value is zero-based in JavaScript
      const day = parseInt(endDateParts[1]);
      const year = parseInt(endDateParts[2]);

      const endDate = new Date(year, month, day);

      const alarmHourParts = todo.alarmHour.split(":");
      const alarmHour = parseInt(alarmHourParts[0]);
      const alarmMinute = parseInt(alarmHourParts[1]);

      // Set the alarm time to the end date
      endDate.setHours(alarmHour);
      endDate.setMinutes(alarmMinute);

      console.log(endDate);
      // Check if the alarm time has already passed
      const currentTime = new Date();
      console.log(currentTime);
      if (endDate > currentTime) {
        // Calculate the time difference in milliseconds
        const timeDifference = endDate.getTime() - currentTime.getTime();

        // Register the notification
        if (Notification.permission === "granted") {
          const notification = new Notification("Task Due", {
            body: todo.name,
          });

          // Play the MP3 sound
          const sound = new Audio(
            "https://quicksounds.com/uploads/tracks/1589352698_1112378855_986823738.mp3"
          );

          sound.play();

          // Set a timeout to close the notification after a certain time
          setTimeout(() => {
            notification.close();
          }, 5000); // Adjust the timeout value as needed
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              const notification = new Notification("Task Due", {
                body: todo.name,
              });

              // Play the MP3 sound
              const sound = new Audio(
                "https://quicksounds.com/uploads/tracks/1589352698_1112378855_986823738.mp3"
              );
              sound.play();

              // Set a timeout to close the notification after a certain time
              setTimeout(() => {
                notification.close();
              }, 5000); // Adjust the timeout value as needed
            }
          });
        }
      }
    }
  };
  useEffect(() => {
    // Show notifications for each todo item
    todos.forEach(showNotification);
  }, [todos]);*/

  return (
    <Box width="auto">
      <Heading as="h2" size="md" mb={4} width="auto">
        Your Due Tasks Are Below:
      </Heading>
      {loading ? (
        <Spinner size="lg" />
      ) : todos && todos.length > 0 ? (
        <List spacing={3} width="100%" maxWidth="auto" alignContent="left">
          {todos
            .filter((todo) => todo.isCompleted === false)
            .map((todo) => (
              <ListItem key={todo.todoId}>
                <Box
                  bg="white"
                  borderRadius="md"
                  boxShadow="base"
                  p={25}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                  maxWidth="auto"
                  margin="auto"
                >
                  {editTodoId === todo.todoId ? (
                    <Input
                      value={editedText}
                      onChange={(e) => {
                        setEditedText(e.target.value);
                      }}
                    />
                  ) : (
                    <Text fontSize="4xs" flex="1">
                      {todo.name}
                    </Text>
                  )}
                  <Button
                    id={todo.todoId}
                    size="sm"
                    colorScheme="red"
                    /*onClick={(e) => setItemID(e.target.id)} */
                    onClick={(e) => {
                      dispatch(deleteTodo(e.target.id));
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    id={todo.todoId}
                    size="sm"
                    colorScheme="blue"
                    onClick={() => {
                      if (editTodoId === "") {
                        //dispatch(editTodo(todo.todoId, editedText));
                        setEditTodoId(todo.todoId);
                      } else {
                        dispatch(editTodo(todo.todoId, editedText));
                        setEditTodoId("");
                      }
                    }}
                  >
                    {editTodoId ? "Save" : "Edit"}
                  </Button>
                </Box>
              </ListItem>
            ))}
        </List>
      ) : (
        <Text>No todos found</Text>
      )}
    </Box>
  );
};
