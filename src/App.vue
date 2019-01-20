<template>
  <div id="app" v-cloak>
    <div class="app-container container">
      <header class="header row center-align">
        <div class="col s12">
          <h1 class="grey-text text-lighten-2">{{ header }}</h1>
        </div>
      </header>

      <section class="new-item row mb-3 p-1">
        <input
          class="form-control col s9 m10"
          type="text"
          placeholder="new item..."
          autocomplete="off"
          v-model.trim="newItem"
          v-on:keyup.enter="addItem"
          @keyup.esc="cleanInput"
        />
        <div class="col s3 m2 center-align">
          <button
            class="btn-floating btn-large waves-effect waves-light"
            v-bind:class="{ disabled: !newItem.length }"
            v-on:click="addItem"
          >
            <i class="material-icons">add</i>
          </button>
        </div>
      </section>

      <section class="filters row">
        <div class="col s4">
          <a
            href="#"
            class="filter-tab"
            v-bind:class="{ 'filter-tab--active': selectedView == 'all' }"
            v-on:click="selectedView = 'all';"
          >
            <span class="badge">{{ todos.length }}</span
            >all
          </a>
        </div>
        <div class="col s4">
          <a
            href="#"
            class="filter-tab"
            :class="{ 'filter-tab--active': selectedView == 'todo' }"
            @click="selectedView = 'todo';"
          >
            <span class="badge">{{ toDoItems }}</span
            >to do
          </a>
        </div>
        <div class="col s4">
          <a
            href="#"
            class="filter-tab"
            :class="{ 'filter-tab--active': selectedView == 'done' }"
            @click="selectedView = 'done';"
          >
            <span class="badge">{{ completedItems }}</span
            >done
          </a>
        </div>
      </section>

      <section class="todo-list">
        <div
          class="row valign-wrapper"
          v-for="(item, index) in filteredTodos"
          v-bind:key="index"
          v-bind:class="{ 'teal-text text-lighten-1': item.done }"
        >
          <div class="col s2">
            <label class="valign-wrapper">
              <input type="checkbox" v-model="item.done" /> <span> </span>
            </label>
          </div>
          <div class="col s8">
            <template v-if="!item.editMode">
              <span v-on:dblclick="item.editMode = true;">
                {{ item.label | lowerCase }}</span
              >
            </template>
            <template v-else>
              <input
                v-model="item.label"
                v-on:keyup.enter="updateItem(index);"
                v-on:blur="updateItem(index);"
              />
            </template>
          </div>
          <div class="col s2 right-align">
            <a
              class="red-text waves-effect waves-light"
              v-on:click="deleteItem(index);"
            >
              <i class="material-icons small">close</i>
            </a>
          </div>
        </div>
      </section>

      <section class="actions row" v-if="todos.length">
        <button
          class="waves-effect waves-light btn red"
          v-on:click="removeAllItems"
        >
          <i class="material-icons left">delete</i>Remove all items
        </button>
      </section>

      <footer class="footer row center-align">
        <div class="col s12">
          <p class="grey-text text-lighten-2">
            Written by <a href="https://github.com/Midob">Midob</a>
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      header: 'Vue.js ToDo App',
      todos: this.loadTodos() || [],
      newItem: '',
      selectedView: 'all'
    };
  },
  computed: {
    toDoItems() {
      return this.todos.filter(x => x.done === false).length;
    },
    completedItems() {
      return this.todos.filter(x => x.done === true).length;
    },
    filteredTodos() {
      let filteredList = this.todos;

      if (this.selectedView === 'todo') {
        filteredList = this.todos.filter(x => !x.done);
      } else if (this.selectedView === 'done') {
        filteredList = this.todos.filter(x => x.done);
      }

      return filteredList;
    }
  },
  watch: {
    todos: {
      handler(oldToDos, newToDos) {
        localStorage.setItem('todos', JSON.stringify(newToDos));
      },
      deep: true
    }
  },
  filters: {
    lowerCase(value) {
      return value.toLowerCase();
    }
  },
  methods: {
    loadTodos() {
      let list = [];

      if (localStorage.getItem('todos')) {
        try {
          list = JSON.parse(localStorage.getItem('todos'));
        } catch (e) {
          localStorage.removeItem('todos');
        }
      }

      return list;
    },
    addItem() {
      if (this.newItem.trim()) {
        this.todos.push({
          label: this.newItem,
          done: false,
          editMode: false
        });
      }
      this.cleanInput();
    },
    updateItem(index) {
      this.todos[index].editMode = false;
    },
    deleteItem(index) {
      this.todos.splice(index, 1);
    },
    cleanInput() {
      this.newItem = '';
    },
    removeAllItems() {
      this.todos = [];
    }
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}

.app-container {
  max-width: 480px;
}

.filter-tab {
  display: block;
  color: inherit;
  border-bottom: 3px solid transparent;
  padding: 10px;
}

.filter-tab--active {
  border-color: #26a69a;
  color: #26a69a;
}
</style>
