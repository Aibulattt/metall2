'use strict'

window.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.feedback;
    const loader = document.querySelector('.loader');
    const overlay = document.querySelector('.overlay');

    form.addEventListener('submit', async (ev) => {
        // loader.classList.add('active');
        // overlay.classList.add('active');
        ev.preventDefault();
        const formdata = new FormData(form);
        const userData = {
            name:  formdata.get('name'),
            email: formdata.get('email'),
            message: formdata.get('message')
        }

        console.log({...userData});
        // const response = await fetch('mail2.php', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: JSON.stringify({...userData})
        // });
        // console.log(response);
        // setTimeout(() => {
        //     loader.classList.remove('active');
        //     overlay.classList.remove('active');
        // }, 2600)
        form.reset();
    })
})







// const name = formdata.get('name');
//         const email = formdata.get('email');
//         const message = formdata.get('message');
