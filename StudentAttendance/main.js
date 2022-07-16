// Declare Counters 
var attendanceCounter = 0;
var nonAttendanceCounter = 0;
var lateCounter = 0;
var countNum = 1;
const popup = document.getElementById("popup");
var table = document.getElementById("table");

/** Students Data
 * @type {Array<{
 *      num:Number;
 *      id:Number;
 *      name:string;
 *      attendance:string;
 * }>}
 */
const studentData = [
    {
        num: countNum++,
        id: 12345,
        firstName: "John ",
        lastName: "Doe",
        attendance: "undefined"
    },
    {
        num: countNum++,
        id: 12346,
        firstName: "Jane ",
        lastName: "Doe",
        attendance: "undefined"
    }
    ,
    {
        num: countNum++,
        id: 12347,
        firstName: "Joe ",
        lastName: "Doe",
        attendance: "undefined"
    },
    {
        num: countNum++,
        id: 12348,
        firstName: "Jack ",
        lastName: "Doe",
        attendance: "undefined"
    },
    {
        num: countNum++,
        id: 12349,
        firstName: "Jill ",
        lastName: "Doe",
        attendance: "undefined"
    }
]

storeInLocalStorage();
renderTable();

// Click Attendance Button
function clickAttendance(row, index) {
    const std = studentData[index];
    std.attendance = "present";
    attendanceCounter += 1;
    document.getElementById("attendanceCounter").innerHTML = attendanceCounter;
    var tr = row.parentNode.parentNode; // tr
    tr.className = "change-color-green";
}

// Click non-attendance Button
function clickNotAttendance(row, index) {
    const std = studentData[index];
    std.attendance = "absent";
    nonAttendanceCounter += 1;
    document.getElementById("nonAttendanceCounter").innerHTML = nonAttendanceCounter;
    var tr = row.parentNode.parentNode; // tr
    tr.className = "change-color-red";
}

// Click Late Button
function clickLate(row, index) {
    const std = studentData[index];
    std.attendance = "late";
    lateCounter += 1;
    document.getElementById("lateCounter").innerHTML = lateCounter;
    var tr = row.parentNode.parentNode; // tr
    tr.className = "change-color-yellow";
}

// Click 'Add Students' Button
function addNewStudent() {
    document.getElementById("page").className = "overlay";
    document.getElementById("popup").style.display = "block";
}

// Get Inputs From User (Popup)
const getID = document.getElementById("getID");
const getFirstName = document.getElementById("getFirstName");
const getLastName = document.getElementById("getLastName");

// Click 'Save' Button Inside Pupup
function getData() {

    const std = {
        num: countNum++,
        id: parseInt(getID.value),
        firstName: getFirstName.value + " ",
        lastName: getLastName.value,
        attendance: "undefined"
    }

    // If Student ID already exist 
    for (var i = 0; i < studentData.length; i++) {
        if (studentData[i].id == std.id) {
            alert("Student ID already exist !! \nTry again ...")
            return;
        }
    }

    // If User Write Nothing
    if (getID.value === '' || getFirstName.value === '' || getLastName.value === '') {
        alert("Please fill all the fields !! \nTry again ...")
        return;
    }

    studentData.push(std);
    const index = studentData.length - 1;

    // renderTable(); // deleted 
    var rowCount = table.rows.length;
    table.deleteRow(rowCount -1);
    table.innerHTML +=
        `
                <tr>
                    <td>${std.num}</td>
                    <td>${std.id}</td>
                    <td>${std.firstName}${std.lastName}</td>
                    <td><button onclick="clickAttendance(this,${index})" class="attendanceButton">&#9989;</button></td>
                    <td><button onclick="clickNotAttendance(this,${index})" class="nonAttendanceButton">&#128683;</button></td>
                    <td><button onclick="clickLate(this,${index})" class="lateButton">&#128337;</button></td>
                </tr>
        `
    table.innerHTML += `
    <tr class="footer">
    <td colspan="3">Statistics</td>
    <td id="attendanceCounter">${attendanceCounter}</td>
    <td id="nonAttendanceCounter">${nonAttendanceCounter}</td>
    <td id="lateCounter">${lateCounter}</td>
    </tr>
    `
    closePupup();
}

// Click 'Cancel' Button Inside Pupup
function closePupup() {
    // Close Pupup And Reset All input values 
    popup.style.display = "none";
    getID.value = '';
    getFirstName.value = '';
    getLastName.value = '';
}

// Click 'Save' Button outside Pupup
function saveData() {

    let csv = 'Number,ID,First Name,Last Name,Attendance\n';

    // Loop the array of objects
    for (let row = 0; row < studentData.length; row++) {
        let keysAmount = Object.keys(studentData[row]).length
        let keysCounter = 0;

        for (let key in studentData[row]) {
            csv += studentData[row][key] + (keysCounter + 1 < keysAmount ? ',' : '\r\n');
            keysCounter++;
        }

        keysCounter = 0;
    }
    console.log(csv)

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'attendance.csv';
    hiddenElement.click();
    storeInLocalStorage();
}

// Click 'Clear All' Button 
function resetAllData() {
    renderTable();
}

function renderTable() {
    table.innerHTML = '';
    attendanceCounter = 0;
    nonAttendanceCounter = 0;
    lateCounter = 0;
    table.innerHTML += `
    <thead>
        <th>Num</th>
        <th>Student ID</th>
        <th>Student Name</th>
        <th colspan="3">Attendance</th>
    </thead>
`
    studentData.forEach((student, index) => {
        student.attendance = "undefined";
        table.innerHTML += `
                <tr>
                    <td>${student.num}</td>
                    <td>${student.id}</td>
                    <td>${student.firstName}${student.lastName}</td>
                    <td><button onclick="clickAttendance(this,${index})" class="attendanceButton">&#9989;</button></td>
                    <td><button onclick="clickNotAttendance(this,${index})" class="nonAttendanceButton">&#128683;</button></td>
                    <td><button onclick="clickLate(this,${index})" class="lateButton">&#128337;</button></td>
                </tr>
        `
    })
    table.innerHTML += `
    <tr class="footer">
    <td colspan="3">Statistics</td>
    <td id="attendanceCounter">0</td>
    <td id="nonAttendanceCounter">0</td>
    <td id="lateCounter">0</td>
    </tr>
    `
}

function storeInLocalStorage() {
    // convert array to JSON string
    // using JSON.stringify()
    const arr = JSON.stringify(studentData);

    // save to localStorage
    localStorage.setItem("array", arr);

    // get the string
    // from localStorage
    const str = localStorage.getItem("array");

    // convert string to valid object
    const parsedArr = JSON.parse(str);

    console.log(parsedArr);

}









