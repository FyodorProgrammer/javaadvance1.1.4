const dbRoles = [{id: 1, name: "ROLE_ADMIN"}, {id: 2, name: "ROLE_USER"}];


async function showRole() {

    const inputRoles = document.getElementById('nRoles');


    inputRoles.innerHTML = `
        <option value="${dbRoles[0].id}" name="ROLE_ADMIN" >${dbRoles[0].name}</option>
        <option value="${dbRoles[1].id}" name="ROLE_USER" >${dbRoles[1].name}</option>
        `
}





document.getElementById('profile-tab').addEventListener('click', showRole)

document.getElementById('addNewUser').addEventListener('click', createUser)

async function createUser() {

    const inputUsername = document.getElementById('nUsername');
    const inputLastName = document.getElementById('nLastName');
    const inputAge = document.getElementById('nAge');
    const inputEmail = document.getElementById('nEmail');
    const inputPassword = document.getElementById('nPassword');
    

    const username = inputUsername.value;
    const lastName = inputLastName.value;
    const age = inputAge.value;
    const email = inputEmail.value;
    const password = inputPassword.value;
    let listRoles = roleArray(document.getElementById('nRoles'));
   

    if (username && lastName && age && email && password && (listRoles.length !== 0)) {

        let res = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, lastName, age, email, password, roles: listRoles })
        };

        await fetch('/api/users', res).then(() => {
            document.forms["newUserForm"].reset();
            getAllUser();
            $("#home-tab").click();
        });
    }







}




let roleArray = (options) => {
    let array =[]
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {
                id: options[i].value,
                name: dbRoles[i].name 
            }

            array.push(role)
        }
    }
    return array
}


async function addUserInTable(result) {
    const id = result.id;
    console.log('hi');
    const res = await fetch(`/api/users/${id}`);
    const user = await res.json();

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









