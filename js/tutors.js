let tutors = [];

request('/tutors').then(d => {
    tutors = d;
    const langs = new Set();
    tutors.forEach(t => t.languages_offered.forEach(l => langs.add(l)));
    languageFilter.innerHTML = '<option value="">Язык</option>' + [...langs].map(l => `<option>${l}</option>`).join('');
    renderTutors();
});

languageFilter.onchange = renderTutors;
experienceFilter.oninput = renderTutors;

function renderTutors() {
    tutorsTable.innerHTML = '';
    tutors.filter(t =>
        (!languageFilter.value || t.languages_offered.includes(languageFilter.value)) &&
        (!experienceFilter.value || t.work_experience >= experienceFilter.value)
    ).forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${t.name}</td>
            <td>${t.language_level}</td>
            <td>${t.languages_spoken.join(', ')}</td>
            <td>${t.work_experience}</td>
            <td>${t.price_per_hour}</td>
            <td><button class="btn btn-outline-primary">Выбрать</button></td>`;
        tutorsTable.append(tr);
    });
}
