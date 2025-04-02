import { getRandomDelay } from './utils.js';
import { getTodos, setTodos } from './storage.js';

export async function createTodo(todoData) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const todos = await getTodos();
                const newTodo = {
                    ...todoData,
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                todos.push(newTodo);
                await setTodos(todos);
                resolve(newTodo);
            } catch (error) {
                reject(error);
            }
        }, getRandomDelay());
    });
}

export async function getTodosByUser(email, filters = {}, sortBy = 'createdAt', page = 1, perPage = 5) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const todos = await getTodos();
            let filteredTodos = todos.filter(todo => todo.email === email);
            
            // Apply filters
            if (filters.priority && filters.priority !== 'all') {
                filteredTodos = filteredTodos.filter(todo => todo.priority === filters.priority);
            }
            
            if (filters.status && filters.status !== 'all') {
                filteredTodos = filteredTodos.filter(todo => todo.status === filters.status);
            }
            
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                filteredTodos = filteredTodos.filter(todo => 
                    todo.title.toLowerCase().includes(searchTerm)
                );
            }
            
            // Apply sorting
            filteredTodos.sort((a, b) => {
                if (sortBy === 'priority') {
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                } else {
                    return a[sortBy] > b[sortBy] ? 1 : -1;
                }
            });
            
            // Apply pagination
            const total = filteredTodos.length;
            const totalPages = Math.ceil(total / perPage);
            const paginatedTodos = filteredTodos.slice(
                (page - 1) * perPage,
                page * perPage
            );
            
            resolve({
                todos: paginatedTodos,
                pagination: {
                    currentPage: page,
                    perPage,
                    total,
                    totalPages
                }
            });
        }, getRandomDelay());
    });
}

export async function updateTodo(todoId, updates) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const todos = await getTodos();
                const index = todos.findIndex(todo => todo.id === todoId);
                
                if (index === -1) {
                    reject(new Error('Todo not found'));
                    return;
                }
                
                const updatedTodo = {
                    ...todos[index],
                    ...updates,
                    updatedAt: new Date().toISOString()
                };
                
                todos[index] = updatedTodo;
                await setTodos(todos);
                resolve(updatedTodo);
            } catch (error) {
                reject(error);
            }
        }, getRandomDelay());
    });
}

export async function deleteTodo(todoId) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const todos = await getTodos();
                const filteredTodos = todos.filter(todo => todo.id !== todoId);
                await setTodos(filteredTodos);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        }, getRandomDelay());
    });
}