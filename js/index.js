'use strict'

window.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.feedback;
    const loader = document.querySelector('.loader');
    const overlay = document.querySelector('.overlay');

    form.addEventListener('submit', (ev) => {
        loader.classList.add('active');
        overlay.classList.add('active');
        ev.preventDefault();
        const formdata = new FormData(form)
        // const userName = formdata.get('name');
        // const userEmail = formdata.get('email');
        // const userMessage = formdata.get('message');
        console.log(formdata.get('name'));
        console.log(formdata.get('email'));
        console.log(formdata.get('message'));
        setTimeout(() => {
            loader.classList.remove('active');
            overlay.classList.remove('active');
        }, 2600)
        form.reset();
    })
})