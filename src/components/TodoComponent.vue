<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <v-col class="mb-4" cols="12">
        <h1 class="display-2 font-weight-bold mb-3">
          Patrick's Todo App
        </h1>

        <p class="subheading font-weight-regular">
          This is an exercise to show my skills for InnoTix
          <v-btn icon @click="onSmileyClick">
            <v-icon>sentiment_satisfied_alt</v-icon>
          </v-btn>
        </p>
      </v-col>

      <v-col class="mb-5" cols="6">
        <h2 class="headline font-weight-bold mb-3">
          Your todo items
        </h2>
        <v-switch id="show-active" v-model="filter" label="Show only active" />

        <v-row
          class="text-left"
          justify="center"
          v-for="(todoItem, i) in todoItemsFiltered"
          :key="i"
        >
          <v-col md="auto">
            {{ todoItem.text }}
          </v-col>
          <v-col class="text-center" md="auto">
            <v-btn icon>
              <v-icon>done</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="todoItemsFiltered.length === 0" justify="center">
          <p>No items found</p>
        </v-row>

        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col>
              <v-text-field id="todo-text" v-model="text" :rules="rules" />
            </v-col>
            <v-col cols="2">
              <v-btn icon @click="addTodoItem" class="mt-3">
                <v-icon x-large color="primary">add_circle</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const LOCAL_STORAGE_KEY = "TOOD_ITEMS";

export default {
  name: "HelloWorld",
  data() {
    return {
      valid: false,
      rules: [val => val.length <= 50 || "Max 50 Characters"],
      filter: false,
      text: "",
      todoItems: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [] //Set initial value
    };
  },
  computed: {
    todoItemsFiltered() {
      return this.todoItems.filter(i => !this.filter || i.done);
    }
  },
  methods: {
    onSmileyClick() {
      window.open("https://www.linkedin.com/in/patrick-wissiak", "_blank");
    },
    addTodoItem() {
      this.$refs.form.validate();
      if (this.valid) {
        this.todoItems.push({ text: this.text, done: false });
        this.text = "";
      }
    }
  },
  watch: {
    todoItems(newVal) {
      //Safe to local storage if property has been changed
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newVal));
    }
  }
};
</script>
