let students = JSON.parse(localStorage.getItem("students")) || [];
let editMode = false;
let editId = null;

/* Save to localStorage */
function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}

/* Render Table */
function renderTable(data = students) {
    let table = document.getElementById("tableBody");
    table.innerHTML = "";

    if (data.length === 0) {
        table.innerHTML = `<tr><td colspan="4">No students found</td></tr>`;
        return;
    }

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

/* Add or Update Student */
function addOrUpdateStudent() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let marks = document.getElementById("marks").value;

    if (!id || !name || !marks) {
        alert("Please fill all fields!");
        return;
    }

    if (editMode) {
        let student = students.find(s => s.id == editId);
        student.name = name;
        student.marks = Number(marks);

        editMode = false;
        editId = null;
    } else {
        let exists = students.find(s => s.id == id);
        if (exists) {
            alert("ID already exists!");
            return;
        }

        students.push({
            id: Number(id),
            name,
            marks: Number(marks)
        });
    }

    saveData();
    renderTable();
    clearInputs();
    closeModal();
}

/* Edit Student */
function editStudent(id) {
    let student = students.find(s => s.id == id);

    document.getElementById("id").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("marks").value = student.marks;

    editMode = true;
    editId = id;

    openModal();
}

/* Delete Student */
function deleteStudent(id) {
    let confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    students = students.filter(s => s.id != id);

    saveData();
    renderTable();
}

/* Search Student */
function searchStudent() {
    let query = document.getElementById("search").value.toLowerCase();

    let filtered = students.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.id.toString().includes(query)
    );

    renderTable(filtered);
}

/* Clear Inputs */
function clearInputs() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("marks").value = "";
}

/* Modal Controls */
function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
    clearInputs();
    editMode = false;
    editId = null;
}

/* Initial Load */
renderTable();
