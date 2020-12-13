/**
 * Tests related to create a new todo
 * Success only granted  for Chrome :)
 *
 * @author Patrick Wissiak
 */

const ID = {
  addTodo: "#add-todo",
  todoText: "#todo-text",
  todoContainer: "#todo-container",
  firstTodoItem: "#todo-item-1"
};

const TEST_TEXT = "Test Todo";
const TEST_TEXT_TOO_LONG = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed";

module.exports = {
  "Test adding a todo item - success": browser => {
    browser
      .init()
      .waitForElementVisible(ID.addTodo)
      .setValue(ID.todoText, TEST_TEXT)
      .click(ID.addTodo)

      .waitForElementVisible(ID.todoContainer + " > " + ID.firstTodoItem)
      .assert.containsText(ID.firstTodoItem, TEST_TEXT)
  },
  "Test adding a todo item with too long text": browser => {
    browser
      .init()
      .waitForElementVisible(ID.addTodo)
      .setValue(ID.todoText, TEST_TEXT_TOO_LONG)
      .click(ID.addTodo)

      .assert.containsText(ID.todoText, "Only 50 characters are allowed")
      .end();
  }
};
