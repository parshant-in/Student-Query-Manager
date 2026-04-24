import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

    getFirestore,

    collection,

    addDoc,

    onSnapshot,

    updateDoc,

    doc

}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



/* ================= FIREBASE ================= */

const firebaseConfig = {

    apiKey: "AIzaSyBmL8X255EvtFMiPA_jkLvRWbyeZ0VolFo",

    authDomain: "student-query-manager.firebaseapp.com",

    projectId: "student-query-manager",

    storageBucket: "student-query-manager.firebasestorage.app",

    messagingSenderId: "279506421734",

    appId: "1:279506421734:web:6f22ac10a60dcede3bb827",

    measurementId: "G-YG3MB3QEGT"

};



const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



/* ================= LOGIN ================= */

window.loginUser = function () {

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

};




/* ================= LOGOUT ================= */

window.logout = function () {

    window.location.href =
        "index.html";

};




/* ================= SUBMIT QUERY ================= */

window.submitQuery = async function () {

    const title =
        document.getElementById("queryTitle").value;

    const category =
        document.getElementById("queryCategory").value;

    const description =
        document.getElementById("queryDescription").value;



    if(!title || !category || !description) {

        alert("Please fill all fields");

        return;
    }



    await addDoc(

        collection(db, "queries"),

        {

            title: title,

            category: category,

            description: description,

            status: "Pending",

            response: "Waiting for response"

        }

    );



    alert("Query Submitted");



    document.getElementById("queryTitle").value = "";

    document.getElementById("queryCategory").value = "";

    document.getElementById("queryDescription").value = "";

};




/* ================= STUDENT DASHBOARD ================= */

function loadStudentQueries() {

    const table =
        document.getElementById("queryTable");



    if(!table) return;



    onSnapshot(

        collection(db, "queries"),

        (snapshot) => {

            table.innerHTML = "";



            snapshot.forEach((docData) => {

                const query =
                    docData.data();



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

    );

}




/* ================= FACULTY DASHBOARD ================= */

function loadFacultyQueries() {

    const table =
        document.getElementById("facultyTable");



    if(!table) return;



    onSnapshot(

        collection(db, "queries"),

        (snapshot) => {

            table.innerHTML = "";



            snapshot.forEach((docData) => {

                const query =
                    docData.data();

                const id =
                    docData.id;



                table.innerHTML += `

                <tr>

                    <td>${query.title}</td>

                    <td>${query.category}</td>

                    <td>${query.description}</td>

                    <td>${query.status}</td>

                    <td>

                        <button
                            onclick="respondQuery('${id}')"
                        >

                            Respond

                        </button>

                    </td>

                </tr>

                `;

            });

        }

    );

}




/* ================= FACULTY RESPONSE ================= */

window.respondQuery = async function (id) {

    const response =
        prompt("Write response");



    if(!response) return;



    const queryRef =
        doc(db, "queries", id);



    await updateDoc(

        queryRef,

        {

            response: response,

            status: "Solved"

        }

    );



    alert("Response Submitted");

};




/* ================= AUTO LOAD ================= */

loadStudentQueries();

loadFacultyQueries(); 