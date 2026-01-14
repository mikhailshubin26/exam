let courses = [];
let page = 1;

request('/courses').then(d => {
    courses = d;
    renderCourses();
});

courseSearch.oninput = () => renderCourses();

function renderCourses() {
    const filtered = courses.filter(c =>
        c.name.toLowerCase().includes(courseSearch.value.toLowerCase()) ||
        c.level.toLowerCase().includes(courseSearch.value.toLowerCase())
    );
    const slice = filtered.slice((page - 1) * 5, page * 5);
    coursesList.innerHTML = '';
    slice.forEach(c => {
        const el = document.createElement('div');
        el.className = 'card mb-2';
        el.innerHTML = `
            <div class="card-body">
                <h5>${c.name}</h5>
                <p>${c.description}</p>
                <button class="btn btn-primary">Подать заявку</button>
            </div>`;
        el.querySelector('button').onclick = () => openOrder(c);
        coursesList.append(el);
    });
}
