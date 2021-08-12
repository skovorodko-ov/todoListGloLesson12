'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

const todoData = []; 
const localData = JSON.parse(localStorage.getItem('todoData'));

localData.forEach(function(item) {
todoData.push(item);
});

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
    '<div class="todo-buttons"></div>' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
    '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');
    const btnTodoRemove = li.querySelector('.todo-remove');

    btnTodoComplete.addEventListener('click', function() {
      item.completed = !item.completed;
      localStorage.clear();
      localStorage.setItem('todoData', JSON.stringify(todoData));
      render();
    });

    btnTodoRemove.addEventListener('click', function (e) {
      let liRemoved = e.target.parentNode;
      let x = e.target.parentNode.children[0].textContent;
      liRemoved.remove();
      todoData.forEach(function(item) {
        if (item.value === x) {
          let index = todoData.indexOf(item);
          todoData.splice(index, 1);
          localStorage.clear();
          localStorage.setItem('todoData', JSON.stringify(todoData));
        }
      });
    });
  });
};

todoControl.addEventListener('submit', function(event) {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false
  };

  if (headerInput.value.trim() !== '') {
    todoData.push(newTodo);
    render();
    headerInput.value = '';
    localStorage.clear();
    localStorage.setItem('todoData', JSON.stringify(todoData));
  }
});

render();