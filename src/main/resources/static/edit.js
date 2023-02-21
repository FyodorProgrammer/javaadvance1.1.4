async function editUserData(id) {

    let href = `http://localhost:8080/api/users/${id}`;


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
            const res = await fetch("http://localhost:8080/api/users", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, username, lastName, age, email, password, roles: listRoleEditUser})
            });
            const result = await res.json();
            console.log(result);
            editUserInTable(result);
            $('#editModal').modal('toggle');
        }
    })
}



async function editUserInTable(result) {
    
    const id = result.id;
    const res = await fetch(`http://localhost:8080/api/users/${id}`);
    const user = await res.json();

    document.getElementById(`user${user.id}`).remove();
    let strRoles = '';

    user.roles.forEach((role) => {
        strRoles += role.name.substring(5) + ' ';
    })



    const tbody = document.getElementById('data');

    tbody.insertAdjacentHTML('beforeend', `
    <tr id="user${user.id}" >
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.lastName}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${strRoles}</td>
        <td>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-info editBtn" data-toggle="modal"
                    data-target="#editModal"
                    onclick="editUserData(${user.id})">
                Edit
            </button>
        </td>
        <td>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-danger"
                    data-toggle="modal"
                    data-target="#deleteModal"
                    onclick="deleteUserData(${user.id})">
                Delete
            </button>
        </td>
    </tr>`)

}