
// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


function generateToken(payload) {
    const signature = 'thisatodoappbyanmol'; 
    
    // const token = jwt.sign({payload},signature, {expiresIn: '1h'});
    // return token;
    
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Parse JWT token
function parseToken(token) {
    try {
        const [, payload] = token.split('.');
        return JSON.parse(atob(payload));
        // const signature = 'thisatodoappbyanmol';
        // const decoded = jwt.verify(token, signature);
        // return decoded.payload;
    } catch (e) {
        return null;
    }
}

// Simple password hashing (use proper hashing in production)
async function hashPassword(password) {
    // const saltRounds = Number(10);
    // const hashedPassword = await bcrypt.hash(password,saltRounds);
    // return hashedPassword;

    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Cookie functions
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}


function getRandomDelay() {
    return Math.floor(Math.random() * 800) + 200;
}


export { 
    debounce, 
    generateToken, 
    parseToken, 
    hashPassword, 
    setCookie, 
    getCookie, 
    deleteCookie, 
    getRandomDelay 
};