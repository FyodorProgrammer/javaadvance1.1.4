async function editUserData(id) {

    let href = `/api/users/${id}`;


         $.get(href, function (user) {
           $('.myForm #id').val(user.id);
           $('.myForm #username').val(user.username);
           $('.myForm #lastName').val(user.lastName);
           $('.myForm #age').val(user.age);
           $('.myForm #email').val(user.email);
           $('.myForm #password').val(user.password);
           const inputRoles = document.getElementById('roles');

           inputRoles.innerHTML = `
            <option value="${dbRoles[0].id}" name="ROLE_ADMIN" >${dbRoles[0].name}</option>
            <option value="${dbRoles[1].id}" name="ROLE_USER" >${dbRoles[1].name}</option>
            `
        })

    document.getElementById('edit-user-button').addEventListener('click', async () => {
        const inputId = document.getElementById('id');
        const inputUsername = document.getElementById('username');
        const inputLastName = document.getElementById('lastName');
        const inputAge = document.getElementById('age');
        const inputEmail = document.getElementById('email');
        const inputPassword = document.getElementById('password');
    
    
        const id = inputId.value;
        const username = inputUsername.value;
        const lastName = inputLastName.value;
        const age = inputAge.value;
        const email = inputEmail.value;
        const password = inputPassword.value;
        const listRoleEditUser = roleArray(document.getElementById('roles'))
    
        if (id && username && lastName && age && email && password) {
            const res = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, username, lastName, age, email, password, roles: listRoleEditUser})
            };

            await fetch('/api/users', res).then(() => {
                $('#edit-close-modal').click();
                getAllUser();
                dataFilling();
            });
        }
    })
}