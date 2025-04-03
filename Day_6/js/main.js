import { debounce } from './utils.js'; 
import { loginUser, setUser, logoutUser, getCurrentUser } from './auth.js';
import { createTodo, getTodosByUser, updateTodo, deleteTodo } from './todo.js';

// DOM Elements
const authSection = document.getElementById('auth-section');
const todoSection = document.getElementById('todo-section');
const loginForm = document.getElementById('login');
const signupForm = document.getElementById('signup');
const todoForm = document.getElementById('todo-form');
const searchInput = document.getElementById('search-todo');

// const priorityFilter = document.getElementById('priority-filter');
// const statusFilter = document.getElementById('status-filter');

const sortBySelect = document.getElementById('sort-by');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');
const usernameDisplay = document.getElementById('username-display');

// State
let currentPage = 1;
const todosPerPage = 5;
let currentFilters = {
    priority: 'all',
    status: 'all',
    search: ''
};
let currentSort = 'createdAt';
let currentUser = null;


// Initialize app
async function init() {
    // pehle se agr session
    currentUser = getCurrentUser();
    
    if (currentUser) {
        showTodoSection();
        loadTodos();
    } else {
        showAuthSection(); // nhi toh login
    }
    
    setupEventListeners(); //alg form dikhao based on button click
}

function setupEventListeners() {
    // Auth forms
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);
    
    // Todo form
    todoForm.addEventListener('submit', handleAddTodo);
    
    // Search with debounce
    searchInput.addEventListener('input', debounce(() => {
        currentFilters.search = searchInput.value.trim();
        currentPage = 1; // by default load the todos in 1st page
        loadTodos();
    }, 300));
    
    // Filters
    // priorityFilter.addEventListener('change', () => {
    //     currentFilters.priority = priorityFilter.value;
    //     currentPage = 1;
    //     loadTodos();
    // });
    
    // statusFilter.addEventListener('change', () => {
    //     currentFilters.status = statusFilter.value;
    //     currentPage = 1;
    //     loadTodos();
    // });
    
    // Sort
    
    sortBySelect.addEventListener('change', () => {
        currentSort = sortBySelect.value;
        loadTodos();
    });
    
    // Pagination
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadTodos();
        }
    });
    
    nextPageBtn.addEventListener('click', () => {
        currentPage++;
        loadTodos();
    });
    
}

// Auth handlers
async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        validateLoginForm(username, password);
        const user = await loginUser(username, password);
        currentUser = user;
        showTodoSection();
        loadTodos();
        loginForm.reset();
    } catch (error) {
        showError('loginPasswordError', error.message);
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        validateSignupForm(name, username, email, password);
        const user = await setUser({ name, username, email, password });
        currentUser = user;
        showTodoSection();
        loadTodos();
        signupForm.reset();
    } catch (error) {
        showError('usernameError', error.message);
    }
}

// Todo handlers
async function handleAddTodo(e) {
    e.preventDefault();
    const title = document.getElementById('todo-input').value.trim();
    const priority = document.getElementById('todo-priority').value;
    
    if (!title) return;
    
    try {
        await createTodo({
            email: currentUser.email,
            title,
            priority,
            status: 'pending'
        });
        document.getElementById('todo-input').value = '';
        loadTodos();
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

// UI functions
async function loadTodos() {
    try {
        const { todos, pagination } = await getTodosByUser(
            currentUser.email,
            currentFilters,
            currentSort,
            currentPage,
            todosPerPage
        );
        
        renderTodos(todos);
        updatePagination(pagination);
    } catch (error) {
        console.error('Error loading todos:', error);
    }
}

function renderTodos(todos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
        todoList.innerHTML = '<p>No todos found. Add a new todo!</p>';
        return;
    }
    
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.priority} ${todo.status}`;
        
        todoItem.innerHTML = `
            <div class="todo-content">
                <h4>${todo.title}</h4>
                <small>Priority: ${todo.priority} | Status: ${todo.status}</small>
                <small>Created: ${new Date(todo.createdAt).toLocaleString()}</small>
            </div>
            <div class="todo-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        
        // Edit button click function
        todoItem.querySelector('.edit-btn').addEventListener('click', async () => {
            // Create form elements
            const title = prompt('Task Title:', todo.title);
            if (title === null) return; // User cancelled
            
            const priority = prompt('Priority (high/medium/low):', todo.priority);
            if (!['high', 'medium', 'low'].includes(priority)) {
                alert('Invalid priority! Must be high, medium, or low');
                return;
            }
            
            const status = prompt('Status (pending/in-progress/completed):', todo.status);
            if (!['pending', 'in-progress', 'completed'].includes(status)) {
                alert('Invalid status! Must be pending, in-progress, or completed');
                return;
            }
            
            try {
                await updateTodo(todo.id, { title, priority, status });
                await loadTodos();
            } catch (error) {
                console.error('Error updating todo:', error);
                alert('Failed to update todo');
            }
        });
        
        // Delete button click function
        todoItem.querySelector('.delete-btn').addEventListener('click', async () => {
            if (confirm('Are you sure you want to delete this todo?')) {
                try {
                    await deleteTodo(todo.id);
                    await loadTodos();
                } catch (error) {
                    console.error('Error deleting todo:', error);
                    alert('Failed to delete todo');
                }
            }
        });

        todoList.appendChild(todoItem);
    });
}

function updatePagination(pagination) {
    prevPageBtn.disabled = pagination.currentPage === 1;
    nextPageBtn.disabled = pagination.currentPage === pagination.totalPages;
    pageInfo.textContent = `Page ${pagination.currentPage} of ${pagination.totalPages}`;
}

// diffrent view form
function showAuthSection() {
    authSection.classList.remove('hide-section');
    authSection.classList.add('show-section');
    todoSection.classList.remove('show-section');
    todoSection.classList.add('hide-section');
}

function showTodoSection() {
    authSection.classList.remove('show-section');
    authSection.classList.add('hide-section');
    todoSection.classList.remove('hide-section');
    todoSection.classList.add('show-section');
    usernameDisplay.textContent = currentUser.username;
}

// Form validation
function validateLoginForm(username, password) {
    clearErrors(['loginUsernameError', 'loginPasswordError']);
    
    if (!username) {
        throw new Error('Username is required');
    }
    
    if (!password) {
        throw new Error('Password is required');
    }
}

function validateSignupForm(name, username, email, password) {
    clearErrors(['nameError', 'usernameError', 'emailError', 'passwordError']);
    
    if (!name) {
        throw new Error('Name is required');
    }
    
    if (!username) {
        throw new Error('Username is required');
    }
    
    if (!email) {
        throw new Error('Email is required');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        throw new Error('Invalid email format');
    }
    
    if (!password) {
        throw new Error('Password is required');
    } else if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
    }
}

function clearErrors(fields) {
    fields.forEach(field => {
        document.getElementById(field).textContent = '';
    });
}

function showError(field, message) {
    document.getElementById(field).textContent = message;
}

// Logout
function logout() {
    logoutUser();
    currentUser = null;
    showAuthSection();
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);

// Export for inline event handlers
window.logout = logout;
window.showForm = function(formId) {
    document.getElementById('login').classList.remove('show-section');
    document.getElementById('signup').classList.remove('show-section');
    document.getElementById(formId).classList.add('show-section');
};