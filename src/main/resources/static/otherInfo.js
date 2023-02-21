async function dataFilling() {
    let principal = await fetch("http://localhost:8080/api/principal").then(function(response) {
        response.json().then(function(data) {
            navbarData(data);
            userTableData(data);

        })
    }).catch(function(error) {
        console.log(error)
    });

}

function navbarData({ id, username, lastName, age, email, roles }) {
    const headerUsername = document.getElementById('headerUsername');

    let strRole = '';

    roles.forEach((role) => {
        strRole += role.name.substring(5) + ' ';
    })

    headerUsername.insertAdjacentHTML('beforeend', `
        <a  class="font-weight-bold text-white" id="headerUsername">${email}</a>
        <a> with roles:</a>
        <a  id="headerRoles">${strRole}</a>
    `)
}


function userTableData({ id, username, lastName, age, email, roles }) {
    const userTable = document.getElementById('tbodyUserTable');
    
    let strRole = '';

    roles.forEach((role) => {
        strRole += role.name.substring(5) + ' ';
    })

    userTable.insertAdjacentHTML('beforeend', `
        <tr>
            <td>${id}</td>
            <td>${username}</td>
            <td>${lastName}</td>
            <td>${age}</td>
            <td>${email}</td>
            <td>${strRole}</td>
        </tr>
        `)

}





window.addEventListener('DOMContentLoaded', dataFilling);