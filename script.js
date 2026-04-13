let students = JSON.parse(localStorage.getItem("students")) || [];
let editMode = false;
let editId = null;

function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}

function renderTable(data = students) {
    let table = document.getElementById("tableBody");
    table.innerHTML = "";

    data.forEach(s => {
        let row = `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.marks}</td>
                <td>
                    <button class="action-btn edit" onclick="editStudent(${s.id})">Edit</button>
                    <button class="action-btn delete" onclick="deleteStudent(${s.id})">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

function addOrUpdateStudent() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let marks = document.getElementById("marks").value;

    if (!id || !name || !marks) {
        alert("Fill all fields");
        return;
    }

    if (editMode) {
        let student = students.find(s => s.id == editId);
        student.name = name;
        student.marks = Number(marks);
        editMode = false;
        editId = null;
    } else {
        students.push({ id: Number(id), name, marks: Number(marks) });
    }

    saveData();
    clearInputs();
    renderTable();
}

function editStudent(id) {
    let student = students.find(s => s.id == id);
    document.getElementById("id").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("marks").value = student.marks;

    editMode = true;
    editId = id;
}

function deleteStudent(id) {
    students = students.filter(s => s.id != id);
    saveData();
    renderTable();
}

function searchStudent() {
    let query = document.getElementById("search").value.toLowerCase();
    let filtered = students.filter(s =>
        s.name.toLowerCase().includes(query)
    );
    renderTable(filtered);
}

function clearInputs() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("marks").value = "";
}

renderTable();
