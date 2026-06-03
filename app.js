const students = [
    { id: 1, name: "Arun", score: 78 },
    { id: 2, name: "Priya", score: 92 },
    { id: 3, name: "Karthik", score: 67 },
    { id: 4, name: "Meena", score: 88 },
    { id: 5, name: "Rahul", score: 55 },
    { id: 6, name: "Divya", score: 73 },
    { id: 7, name: "Vignesh", score: 81 },
    { id: 8, name: "Anitha", score: 95 },
    { id: 9, name: "Sanjay", score: 62 },
    { id: 10, name: "Nisha", score: 48 }
];

function loadDashboard() {

    const totalStudents = students.length;

    const scores = students.map(student => student.score);

    const averageMarks =
        (scores.reduce((sum, score) => sum + score, 0) / totalStudents)
        .toFixed(2);

    const highestScore = Math.max(...scores);

    const lowestScore = Math.min(...scores);

    const topStudent =
        students.find(student => student.score === highestScore);

    const bottomStudent =
        students.find(student => student.score === lowestScore);

    document.getElementById("totalStudents").textContent =
        totalStudents;

    document.getElementById("averageMarks").textContent =
        averageMarks;

    document.getElementById("highestScore").textContent =
        highestScore;

    document.getElementById("lowestScore").textContent =
        lowestScore;

    document.getElementById("topStudent").textContent =
        `🏆 Top Performer: ${topStudent.name} (${topStudent.score})`;

    document.getElementById("bottomStudent").textContent =
        `📉 Bottom Performer: ${bottomStudent.name} (${bottomStudent.score})`;

    loadTable();
    loadBarChart();
    loadPieChart();
}

function getGrade(score){

    if(score >= 80){
        return "A";
    }
    else if(score >= 60){
        return "B";
    }

    return "C";
}

function loadTable(){

    const tableBody =
        document.getElementById("studentTable");

    students.forEach(student => {

        const grade = getGrade(student.score);

        const gradeClass =
            grade === "A" ? "grade-a" :
            grade === "B" ? "grade-b" :
            "grade-c";

        tableBody.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.score}</td>
                <td class="${gradeClass}">
                    ${grade}
                </td>
            </tr>
        `;
    });
}

function loadBarChart(){

    const ctx =
        document.getElementById("marksChart")
        .getContext("2d");

    new Chart(ctx, {

        type:"bar",

        data:{
            labels:students.map(student => student.name),

            datasets:[{
                label:"Marks",
                data:students.map(student => student.score),
                backgroundColor:"#007bff"
            }]
        },

        options:{
            responsive:true,

            plugins:{
                title:{
                    display:true,
                    text:"Student Marks Comparison"
                }
            },

            scales:{
                y:{
                    beginAtZero:true,
                    max:100
                }
            }
        }
    });
}

function loadPieChart(){

    let excellent = 0;
    let good = 0;
    let average = 0;
    let poor = 0;

    students.forEach(student => {

        if(student.score >= 80){
            excellent++;
        }
        else if(student.score >= 60){
            good++;
        }
        else if(student.score >= 40){
            average++;
        }
        else{
            poor++;
        }
    });

    const ctx =
        document.getElementById("performancePieChart")
        .getContext("2d");

    new Chart(ctx, {

        type:"doughnut",

        data:{
            labels:[
                "Excellent (80+)",
                "Good (60-79)",
                "Average (40-59)",
                "Poor (<40)"
            ],

            datasets:[{
                data:[
                    excellent,
                    good,
                    average,
                    poor
                ],

                backgroundColor:[
                    "#28a745",
                    "#17a2b8",
                    "#ffc107",
                    "#dc3545"
                ]
            }]
        },

        options:{
            responsive:true,

            plugins:{
                title:{
                    display:true,
                    text:"Performance Distribution"
                }
            }
        }
    });
}

loadDashboard();