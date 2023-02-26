
async function getAllUser() {
    const res = await fetch("/api/users");
    document.getElementById('data').innerHTML = '';
    if (res.ok) {
        let users = await res.json();
        users.forEach(user => {
            usersToHTML(user);
        });

    } else {
        alert(`Error, ${page.status}`);
    }
}


function usersToHTML({ id, username, lastName, age, email, roles }) {
    let tbody = document.getElementById('data');
    let strRole = '';

    roles.forEach((role) => {
        strRole += role.name.substring(5) + ' ';
    })

    tbody.insertAdjacentHTML('beforeend', `
    <tr id="user${id}" >
        <td>${id}</td>
        <td>${username}</td>
        <td>${lastName}</td>
        <td>${age}</td>
        <td>${email}</td>
        <td>${strRole}</td>
        <td>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-info editBtn" data-toggle="modal"
                    data-target="#editModal"
                    onclick="editUserData(${id})">
                Edit
            </button>
        </td>
        <td>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-danger"
                    data-toggle="modal"
                    data-target="#deleteModal"
                    onclick="deleteUserData(${id})">
                Delete
            </button>
        </td>
    </tr>`)
}
getAllUser();