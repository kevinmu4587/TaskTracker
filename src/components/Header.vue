// this is one component of our application
<template>
  <header>
    <h1>{{ title }}</h1>
<!--    only show the button if we are on the homepage-->
    <Button v-show="isHomePage"
      @btn-click="$emit('toggle-add-task-form')"
      :text="formActive ? 'Close' : 'Add Task'"
      :colour="formActive ? 'red' : 'green'"
    />
    <!-- <h4>{{description}}</h4> -->
  </header>
</template>

<script>
import Button from "./Button";

export default {
  name: "Header",
  // props are arguments that are passed into the component tag
  props: {
    // can list props inside this object
    title: String,

    // they can be objects themselves, where we specify extra stuff like default value
    // description: {
    //   type: String,
    //   default: "This is the default description.",
    // },

    formActive: Boolean
  },
  components: {
    Button,
  },
  computed: {
    isHomePage() {
      // get the current route and check if it is home
      return this.$route.path === '/'
    }
  }
};
</script>

// making this style scoped means it only applies to this component
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>