<template>
<!--  only shown if showAddTaskForm is true-->
    <AddTask v-show="showAddTaskForm" @add-task="addTask"/>
  <!-- bind the tasks array into the prop, so the page updates if the list updates -->
  <Tasks
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask"
      :tasks="tasks"
  />
</template>

<script>
import Tasks from "../components/Tasks";
import AddTask from "../components/AddTask";
export default {
  name: 'Home',
  components: {
    AddTask,
    Tasks
  },
  data() {
    return {
      tasks: []
    }
  },
  props: {
    showAddTaskForm: Boolean
  },
  methods: {
    async addTask(newTask) {
      // make a post request
      const res = await fetch('api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newTask)
      })

      // return the new task and append it
      const data = await res.json()
      this.tasks = [...this.tasks, data];
    },
    async deleteTask(id) {
      if (confirm("Are you sure?")) {
        // make the delete request
        const res = await fetch(`api/tasks/${id}`, {
          method: 'DELETE',
        })

        // if the delete was successful
        res.status === 200 ?
            // update the tasks array
            // include anything that does not match the passed=up id
            (this.tasks = this.tasks.filter(
                (task) => task.id !== id // a function that returns true for the id's that don't match
            )) :
            alert('Error deleting the task!')
      }
    },
    async toggleReminder(id) {
      const toToggle = await this.fetchTaskByID(id);
      const updatedTask = {...toToggle, reminder: !toToggle.reminder};
      console.log(updatedTask)

      // make a PUT request (for updating)
      const res = await fetch(`api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      })
      const data = await res.json()

      // update the UI by assigning the tasks to be:
      // map the tasks so that if the id matches, swap out the task with a copy with inverted reminder
      // the { ... task, reminder: !task.reminder } just means a object that is just task, except to
      //   invert the reminder.
      // uses the ternary operator
      this.tasks = this.tasks.map((task) =>
          task.id === id ? {...task, reminder: !task.reminder} : task
      );
    },
    async fetchTasks() {
      const res = await fetch('api/tasks');
      const data = await res.json();
      return data;
    },
    async fetchTaskByID(id) {
      // using back ticks allows us to use ${} to put a variable inside the input string
      const res = await fetch(`api/tasks/${id}`);
      const data = await res.json();
      console.log("fetch by id returned: " + JSON.stringify(data))
      return data;
    }
  },
  // this method runs after this component is fully loaded
  async created() {
    this.tasks = await this.fetchTasks();
  }
}
</script>