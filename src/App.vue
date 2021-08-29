// The HTML views
<template>
  <div class="container">
    <!-- we can freely use components after we import them -->
    <!-- we can pass in props  -->
    <Header @toggle-add-task-form="toggleAddTask" title="Task Tracker"
    :formActive="showAddTaskForm"/>
    <!-- div is only active if showAddTaskForm is true -->
    <div v-if="showAddTaskForm">
      <AddTask @add-task="addTask" />
    </div>
    <!-- bind the tasks array into the prop, so the page updates if the list updates -->
    <Tasks
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask"
      :tasks="tasks"
    />
  </div>
</template>

// the logic and where we store our data
<script>
// import the header component
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

export default {
  name: "App",
  components: {
    // our list of components
    Header,
    Tasks,
    AddTask,
  },
  data() {
    return {
      tasks: [],
      showAddTaskForm: false,
    };
  },
  methods: {
    toggleAddTask() {
      this.showAddTaskForm = !this.showAddTaskForm;
    },
    addTask(newTask) {
      // append the new task
      this.tasks = [...this.tasks, newTask];
    },
    deleteTask(id) {
      if (confirm("Are you sure?")) {
        // update the tasks array
        // include anything that does not match the passed=up id
        this.tasks = this.tasks.filter(
          (task) => task.id !== id // a function that returns true for the id's that don't match
        );
        console.log("task", id);
      }
    },
    toggleReminder(id) {
      // assign the tasks to be:
      // map the tasks so that if the id matches, swap out the task with a copy with inverted reminder
      // the { ... task, reminder: !task.reminder } just means a object that is just task, except to
      //   invert the reminder.
      // uses the ternary operator
      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      );
    },
  },
  // this method runs after this component is fully loaded
  created() {
    this.tasks = [
      {
        id: 1,
        text: "Doctor's Appointment",
        day: "March 1st at 2:30pm",
        reminder: true,
      },
      {
        id: 2,
        text: "Meeting at school",
        day: "March 3rd at 1:30pm",
        reminder: true,
      },
      {
        id: 3,
        text: "Grocery shopping",
        day: "March 1st at 11:00am",
        reminder: false,
      },
    ];
  },
};
</script>

// the styles
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
