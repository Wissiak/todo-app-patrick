<template>
  <v-app>
    <v-main>
      <TodoComponent />
    </v-main>
  </v-app>
</template>

<script>
import TodoComponent from "./components/TodoComponent";
import "material-design-icons-iconfont/dist/material-design-icons.css";

export default {
  name: "App",

  components: {
    TodoComponent
  }
};
</script>
