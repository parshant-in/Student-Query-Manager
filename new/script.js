/* ================= LOGIN ================= */

function loginUser() {

    const role =
        document.getElementById("role").value;


    if(role === "student") {

        window.location.href =
            "student_dashboard.html";
    }

    else if(role === "faculty") {

        window.location.href =
            "faculty_dashboard.html";
    }

    else {

        alert("Please select role");
    }
}



/* ================= LOGOUT ================= */

function logout() {

    window.location.href = "index.html";
}



/* ================= SUBMIT QUERY ================= */

function submitQuery() {

    const title =
        document.getElementById("queryTitle").value;

    const category =
        document.getElementById("queryCategory").value;

    const description =
        document.getElementById("queryDescription").value;



    if(!title || !category || !description){

        alert("Please fill all fields");

        return;
    }



    let queries =
        JSON.parse(
            localStorage.getItem("queries")
        ) || [];



    const newQuery = {

        id: Date.now(),

        title: title,

        category: category,

        description: description,

        status: "Pending",

        response: "Waiting for response"
    };



    queries.push(newQuery);



    localStorage.setItem(
        "queries",
        JSON.stringify(queries)
    );



    alert("Query Submitted");



    document.getElementById(
        "queryTitle"
    ).value = "";


    document.getElementById(
        "queryCategory"
    ).value = "";


    document.getElementById(
        "queryDescription"
    ).value = "";



    loadStudentQueries();
}




/* ================= STUDENT TABLE ================= */

function loadStudentQueries() {

    const table =
        document.getElementById("queryTable");GPUCanvasContext

    if(!table) return;



    table.innerHTML = "";



    let queries =
        JSON.parse(
            localStorage.getItem("queries")
        ) || [];



    queries.forEach((query) => {

        table.innerHTML += `

        <tr>

            <td>${query.title}</td>

            <td>${query.category}</td>

            <td>${query.description}</td>

            <td>${query.status}</td>

            <td>${query.response}</td>

        </tr>

        `;
    });
}




/* ================= FACULTY TABLE ================= */

function loadFacultyQueries() {

    const table =
        document.getElementById("facultyTable");

    if(!table) return;



    table.innerHTML = "";



    let queries =
        JSON.parse(
            localStorage.getItem("queries")
        ) || [];



    queries.forEach((query, index) => {

        table.innerHTML += `

        <tr>

            <td>${query.title}</td>

            <td>${query.category}</td>

            <td>${query.description}</td>

            <td>${query.status}</td>

            <td>

                <button
                    onclick="respondQuery(${index})"
                >

                    Respond

                </button>

            </td>

        </tr>

        `;
    });
}




/* ================= FACULTY RESPONSE ================= */

function respondQuery(index) {

    let queries =
        JSON.parse(
            localStorage.getItem("queries")
        ) || [];


    const response =
        prompt("Write response");


    if(!response) return;



    queries[index].response =
        response;


    queries[index].status =
        "Solved";



    localStorage.setItem(
        "queries",
        JSON.stringify(queries)
    );



    alert("Response Submitted");



    loadFacultyQueries();
}




/* ================= AUTO LOAD ================= */

loadStudentQueries();

loadFacultyQueries();