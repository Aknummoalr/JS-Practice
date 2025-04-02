import { hashPassword, generateToken, setCookie, getCookie, deleteCookie, getRandomDelay, parseToken } from './utils.js';
import { getUsers, setUsers } from './storage.js';

export async function getUser(username) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const users = await getUsers();
            const user = users.find(u => u.username === username);
            if (user) {
                resolve(user);
            } else {
                reject(new Error('User not found'));
            }
        }, getRandomDelay());
    });
}

export async function setUser(userData) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const users = await getUsers();
                const existingUserIndex = users.findIndex(u => u.username === userData.username);
                
                if (existingUserIndex !== -1) {
                    reject(new Error('Username already exists'));
                } else {
                    // Hash password before storing
                    userData.password = await hashPassword(userData.password);
                    users.push(userData);
                    await setUsers(users);
                    
                    // Generate token and set cookie
                    const token = generateToken({
                        username: userData.username,
                        email: userData.email
                    });
                    setCookie('authToken', token, 7);
                    
                    resolve({
                        username: userData.username,
                        email: userData.email,
                        token
                    });
                }
            } catch (error) {
                reject(error);
            }
        }, getRandomDelay());
    });
}

export async function loginUser(username, password) {
    try {
        const user = await getUser(username);
        const hashedPassword = await hashPassword(password);
        
        if (user.password === hashedPassword) {
            const token = generateToken({
                username: user.username,
                email: user.email
            });
            setCookie('authToken', token, 7);
            return {
                username: user.username,
                email: user.email,
                token
            };
        } else {
            throw new Error('Invalid password');
        }
    } catch (error) {
        throw error;
    }
}

export function logoutUser() {
    deleteCookie('authToken');
}

export function getCurrentUser() {
    const token = getCookie('authToken');
    if (token) {
        return parseToken(token);
    }
    return null;
}