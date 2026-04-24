/** @odoo-module **/

import { Component, useState, useRef, onMounted } from "@odoo/owl";
import { TodoItem } from "./todo_item";
import { useAutofocus } from "../utils";

export class TodoList extends Component {
    static template = "awesome_owl.todoList";
    static components = { TodoItem };

    setup() {
        // Liste réactive de todos
        this.todos = useState([]);
        this.nextId = 1;
        // Focus automatique sur l'input
        useAutofocus("input");
    }

    addTodo(ev) {
        // On ajoute seulement si Enter est pressé
        if (ev.keyCode === 13) {
            const description = ev.target.value.trim();
            // Ne rien faire si vide
            if (!description) return;
            this.todos.push({
                id: this.nextId++,
                description,
                isCompleted: false,
            });
            // Vider l'input
            ev.target.value = "";
        }
    }

    toggleState(id) {
        const todo = this.todos.find((t) => t.id === id);
        if (todo) {
            todo.isCompleted = !todo.isCompleted;
        }
    }

    removeTodo(id) {
        const index = this.todos.findIndex((t) => t.id === id);
        if (index >= 0) {
            this.todos.splice(index, 1);
        }
    }
}