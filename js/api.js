const API = 'http://exam-api-courses.std-900.ist.mospolytech.ru/api';
const KEY = '5c85e370-a4a9-48e4-a7cb-98f94615eac5';

function request(url, options = {}) {
    return fetch(`${API}${url}?api_key=${KEY}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    }).then(r => r.json());
}

function alertMsg(text, type = 'success') {
    const a = document.createElement('div');
    a.className = `alert alert-${type}`;
    a.textContent = text;
    alerts.append(a);
    setTimeout(() => a.remove(), 5000);
}
