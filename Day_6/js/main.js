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
const todosPerPage = 3;
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
        todoItem.dataset.id = todo.id;
        
        // Normal view (non-editing)
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
        
        // Edit button function
        todoItem.querySelector('.edit-btn').addEventListener('click', () => {
            todoItem.innerHTML = `
                <div class="edit-form">
                    <input type="text" class="edit-title" value="${todo.title}">
                    <div class="edit-fields">
                        <select class="edit-priority">
                            <option value="high" ${todo.priority === 'high' ? 'selected' : ''}>High</option>
                            <option value="medium" ${todo.priority === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="low" ${todo.priority === 'low' ? 'selected' : ''}>Low</option>
                        </select>
                        <select class="edit-status">
                            <option value="pending" ${todo.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="in-progress" ${todo.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                            <option value="completed" ${todo.status === 'completed' ? 'selected' : ''}>Completed</option>
                        </select>
                    </div>
                    <div class="edit-actions">
                        <button class="save-btn">Save</button>
                        <button class="cancel-btn">Cancel</button>
                    </div>
                </div>
            `;
            
            
            todoItem.querySelector('.save-btn').addEventListener('click', async () => {
                const title = todoItem.querySelector('.edit-title').value.trim();
                const priority = todoItem.querySelector('.edit-priority').value;
                const status = todoItem.querySelector('.edit-status').value;
                
                try {
                    await updateTodo(todo.id, { title, priority, status });
                    await loadTodos(); // Refresh
                } catch (error) {
                    console.error('Error updating todo:', error);
                    alert('Failed to update todo');
                }
            });
            
            // Cancel button
            todoItem.querySelector('.cancel-btn').addEventListener('click', async () => {
                await loadTodos(); 
            });
        });
        
        // Delete button function still i use alert()
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


function clearErrors(fields) {
    fields.forEach(field => {
        document.getElementById(field).textContent = '';
    });
}

function showError(field, message) {
    document.getElementById(field).textContent = message;
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
        showError('nameError', 'Name is required');
        return false;
    }
    
    if (!username) {
        showError('usernameError', 'Username is required');
        return false;
    }
    
    if (!email) {
        showError('emailError', 'Email is required');
        return false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        showError('emailError', 'Invalid email format');
        return false;
    }
    
    if (!password) {
        showError('passwordError', 'Password is required');
        return false;
    } else if (password.length < 6) {
        showError('passwordError', 'Password must be at least 6 characters');
        return false;
    }
    
    return true;
}

async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!validateSignupForm(name, username, email, password)) {
        return ; 
    }
    
    try {
        const user = await setUser({ name, username, email, password });
        currentUser = user;
        showTodoSection();
        loadTodos();
        signupForm.reset();
    } catch (error) {
        showError('usernameError', error.message);
    }
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