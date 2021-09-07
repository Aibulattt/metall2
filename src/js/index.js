// import '../style/style.css';

'use strict'

window.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.feedback;
    const loader = document.querySelector('.loader');
    const overlay = document.querySelector('.overlay');

    form.addEventListener('submit', async (ev) => {
        loader.classList.add('active');
        overlay.classList.add('active');
        ev.preventDefault();
        const response = await fetch('mail2.php', {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => {
            if (response.ok) {
                loader.classList.remove('active');
                overlay.classList.remove('active');
            }
        })
        form.reset();
    })
})







