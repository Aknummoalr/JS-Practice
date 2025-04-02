import { getRandomDelay } from './utils.js';


export async function getUsers() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(JSON.parse(localStorage.getItem("users")) || []);
        }, getRandomDelay());
    });
}

export async function setUsers(users) {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem("users", JSON.stringify(users));
            resolve();
        }, getRandomDelay());
    });
}

export async function getTodos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(JSON.parse(localStorage.getItem("todos")) || []);
        }, getRandomDelay());
    });
}

export async function setTodos(todos) {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem("todos", JSON.stringify(todos));
            resolve();
        }, getRandomDelay());
    });
}

