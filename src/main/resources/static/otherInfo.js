async function dataFilling() {
    const principal = await fetch("/api/principal");
    document.getElementById('tbodyUserTable').innerHTML = '';
    if (principal.ok) {
        let user = await principal.json();
        userToHTML(user);

    } else {
        alert(`Error, ${page.status}`);
    }

}

function userToHTML({ id, username, lastName, age, email, roles }) {
    let tbody = document.getElementById('tbodyUserTable');
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
    </tr>`)
}

dataFilling();