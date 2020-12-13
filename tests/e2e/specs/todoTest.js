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
  showOnlyActive: "#show-active",

  firstTodoItem: "#todo-item-1",
  firstTodoItemTick: "#todo-item-1-tick",
  firstTodoItemDelete: "#todo-item-1-tick",
  secondTodoItem: "#todo-item-1"
};

const SERVER_URL = process.env.VUE_DEV_SERVER_URL;
const TEST_TEXT = "Test Todo";
const TEST_TEXT_2 = "ZZZ";
const TEST_TEXT_TOO_LONG =
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed";

module.exports = {
  "Test adding a todo item - success": browser => {
    browser
      .init()
      .url(SERVER_URL)
      .waitForElementVisible(ID.addTodo)
      .setValue(ID.todoText, TEST_TEXT)
      .click(ID.addTodo)

      .waitForElementVisible(ID.todoContainer + " > " + ID.firstTodoItem)
      .expect.element(ID.firstTodoItem)
      .text.to.equal(TEST_TEXT)
      .expect.element(ID.todoText)
      .text.to.equal("");
  },
  "Test adding a todo item with too long text": browser => {
    browser
      .setValue(ID.todoText, TEST_TEXT_TOO_LONG)
      .click(ID.addTodo)

      .expect.element(ID.todoText)
      .text.to.equal("Max 50 Characters");
  },
  "Test ticking todo item": browser => {
    browser
      .click(ID.firstTodoItemTick)
      .assert.cssClassPresent(ID.firstTodoItem, "todoFinished");
  },
  "Test filter todo items": browser => {
    browser
      //Create new item first and then filter - first item is already finished
      .setValue(ID.todoText, TEST_TEXT_2)
      .click(ID.addTodo)
      .waitForElementVisible(ID.todoContainer + " > " + ID.secondTodoItem)

      //Filter for active items
      .expect.element(ID.secondTodoItem)
      .to.be.visible //Second item should be visible
      .click(ID.showOnlyActive)
      .expect.element(ID.secondTodoItem)
      .not.to.be.visible //Second item should not be visible
      .expect.element(ID.firstTodoItem)
      .text.to.equal(TEST_TEXT); //The first item should still be available with the correct text
  },
  "Test delete todo item": browser => {
    browser
      .click(ID.firstTodoItemDelete)

      .expect.element(ID.secondTodoItem)
      .not.to.be.visible //Only one item should be left
      .end();
  }
};
