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
  textFieldWrapper: "#text-field-wrapper",
  noItems: "#no-items",

  firstTodoItem: "#todo-item-0",
  firstTodoItemTick: "#todo-item-0-tick",
  firstTodoItemDelete: "#todo-item-0-delete",
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
      .waitForElementVisible(ID.addTodo, 5000)
      .setValue(ID.todoText, TEST_TEXT)
      .click(ID.addTodo)

      .waitForElementVisible(ID.firstTodoItem, 5000)
      .expect.element(ID.firstTodoItem)
      .text.to.equal(TEST_TEXT);
    browser.expect.element(ID.todoText).text.to.equal("");
  },
  "Test adding a todo item with too long text": browser => {
    browser
      .setValue(ID.todoText, TEST_TEXT_TOO_LONG)
      .click(ID.addTodo)

      .expect.element(ID.textFieldWrapper)
      .text.to.equal("Max 50 Characters");
    browser.setValue(ID.todoText, [
      browser.Keys.CONTROL,
      "a",
      browser.Keys.DELETE
    ]);
  },
  "Test ticking todo item": browser => {
    browser
      .click(ID.firstTodoItemTick)
      .moveToElement(ID.showOnlyActive, undefined, undefined)
      .mouseButtonClick("left")
      .assert.cssClassPresent(ID.firstTodoItem, "todoFinished");
  },
  "Test filter todo items": browser => {
    browser
      //Create new item first and then filter - first item is already finished
      .setValue(ID.todoText, TEST_TEXT_2)
      .click(ID.addTodo)
      .waitForElementVisible(ID.secondTodoItem, 5000)

      //Filter for active items
      .assert.elementCount("#todo-container > div", 2)
      .moveToElement(ID.showOnlyActive, undefined, undefined)
      .mouseButtonClick("left")
      .assert.elementCount("#todo-container > div", 1)
      .expect.element(ID.firstTodoItem)
      .text.to.equal(TEST_TEXT_2); //The first item should still be available with the correct text
  },
  "Test delete todo item": browser => {
    browser.click(ID.firstTodoItemDelete).expect.element(ID.noItems).to.be
      .present;
    browser.end();
  }
};
