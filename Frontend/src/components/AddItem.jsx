import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  FormControl,
  FormLabel,
  Select,
  VStack,
  HStack,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import { createTodo } from "../redux/actions/todoAction";
import { FetchTodo } from "./FetchList";
import { format, setMinutes, setHours } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddItem = () => {
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState("");

  const dispatch = useDispatch();

  const generateHourOptions = () => {
    const hours = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = setMinutes(setHours(new Date(), hour), minute);
        hours.push({
          value: format(time, "HH:mm"),
          label: format(time, "HH:mm"),
        });
      }
    }
    return hours;
  };

  const handleDateChange = (event) => {
    setSelectedDate(event);
  };

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const date = format(selectedDate, "MM/dd/yyyy");
      dispatch(createTodo(title, date, selectedHour));
      setTitle("");
    }
  };

  return (
    <Box
      maxWidth="auto"
      width="100%"
      margin="10px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add new task"
            size="md"
            mb={4}
          />
        </FormControl>
        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Hour</FormLabel>
            <Select value={selectedHour} onChange={handleHourChange}>
              {generateHourOptions().map((hourOption) => (
                <option key={hourOption.value} value={hourOption.value}>
                  {hourOption.label}
                </option>
              ))}
            </Select>
          </FormControl>
        </HStack>
        <VStack align="center" mt={4}>
          <Button colorScheme="blue" type="submit">
            Add Task
          </Button>
        </VStack>
      </form>
      <Box
        maxWidth="auto"
        width="100%"
        alignItems="center"
        margin="5 auto"
        mt={8}
      >
        <FetchTodo />
      </Box>
    </Box>
  );
};

export default AddItem;
