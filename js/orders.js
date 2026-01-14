let currentCourse;

function openOrder(course) {
    currentCourse = course;
    orderTitle.textContent = 'Оформление заявки';
    courseId.value = course.id;
    courseName.value = course.name;
    timeStart.innerHTML = '';
    course.start_dates.forEach(d => {
        const t = d.slice(11, 16);
        timeStart.innerHTML += `<option>${t}</option>`;
    });
    calculate();
    new bootstrap.Modal(orderModal).show();
}

document.querySelectorAll('#orderForm input, #orderForm select')
    .forEach(e => e.onchange = calculate);

function calculate() {
    const hours = currentCourse.week_length * currentCourse.total_length;
    let sum = currentCourse.course_fee_per_hour * hours;
    const time = timeStart.value;
    if (time >= '09:00' && time <= '12:00') sum += 400;
    if (time >= '18:00' && time <= '20:00') sum += 1000;
    if (supplementary.checked) sum += 2000 * persons.value;
    if (personalized.checked) sum += 1500 * currentCourse.total_length;
    if (excursions.checked) sum *= 1.25;
    if (interactive.checked) sum *= 1.5;
    if (assessment.checked) sum += 300;
    if (persons.value >= 5) sum *= 0.85;
    price.textContent = Math.round(sum);
}

saveOrder.onclick = () => {
    request('/orders', {
        method: 'POST',
        body: JSON.stringify({
            course_id: Number(courseId.value),
            tutor_id: 0,
            date_start: dateStart.value,
            time_start: timeStart.value,
            persons: Number(persons.value),
            duration: currentCourse.week_length * currentCourse.total_length,
            price: Number(price.textContent),
            early_registration: false,
            group_enrollment: persons.value >= 5,
            intensive_course: currentCourse.week_length >= 5,
            supplementary: supplementary.checked,
            personalized: personalized.checked,
            excursions: excursions.checked,
            assessment: assessment.checked,
            interactive: interactive.checked
        })
    }).then(() => {
        alertMsg('Заявка создана');
        bootstrap.Modal.getInstance(orderModal).hide();
    });
};
