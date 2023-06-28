import mongoose, { Mongoose, mongo } from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    alarmHour: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Use a regular expression to validate the time format (HH:mm)
          // 18:30' // Set the time to 6:30 PM
          return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid time in HH:mm format!`,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    todoId: {
      type: String,
      required: true,
      default: function () {
        return (
          "TODO" +
          Math.floor(100 + Math.random() * 900) +
          Date.now().toString().slice(2, 4) +
          this.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase()
        );
      },
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
