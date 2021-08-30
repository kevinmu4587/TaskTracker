// The HTML views
<template>
  <div class="container">
    <!-- we can freely use components after we import them -->
    <!-- we can pass in props  -->
    <Header @toggle-add-task-form="toggleAddTask" title="Task Tracker"
            :formActive="showAddTaskForm"/>
    <!--    this router-view only displays if we are on the correct view-->
    <router-view :showAddTaskForm="showAddTaskForm"></router-view>
    <Footer/>
  </div>
</template>

// the logic and where we store our data
<script>
// import the header component
import Header from "./components/Header";
import Footer from "./components/Footer"

export default {
  name: "App",
  components: {
    // our list of components that will display on every route
    Header,
    Footer,
  },
  data() {
    return {
      showAddTaskForm: false,
    };
  },
  methods: {
    toggleAddTask() {
      this.showAddTaskForm = !this.showAddTaskForm;
    }
  },
}
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
