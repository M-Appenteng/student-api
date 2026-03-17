const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

const students = [
    { id: 1, name: "Alex", major: "Nursing", gpa: 3.80 },
    { id: 2, name: "Michael", major: "Biology", gpa: 3.70 },
    { id: 3, name: "Janelle", major: "Speech Pathology", gpa: 3.50 }
];

app.get("/", (req, res) => {
    res.send("Student API running...");
});

app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/students/:id", (req, res) => {
    const studentID = parseInt(req.params.id);
    const student = students.find(s => s.id === studentID);
    if (!student) {
        return res.status(404).json({ message: "Student not found."});
    }

    res.json(student);
});

app.post("/students", (req, res) => {
    const { name, major, gpa } = req.body;
    if (!name || !major || gpa == undefined) {
        return res.status(400).json({ message: "Missing required student fields."});
    }

    if (isNaN(gpa)) {
        return res.status(400).json({ message: "GPA must be a number."});
    }

    const newStudent = {
        id: students.length + 1,
        name,
        major,
        gpa
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.put("/students/:id", (req, res) => {
    const studentID = parseInt(req.params.id);
    const student = students.find(s => s.id === studentID);
    if (!student) {
        return res.status(404).json({ message: "Student not found." });
    }
    
    const { name, major, gpa } = req.body;
    if (!name || !major || gpa == undefined) {
        return res.status(400).json({ message: "Missing required student fields."});
    }

    if (isNaN(gpa)) {
        return res.status(400).json({ message: "GPA must be a number."});
    }
    
    student.name = name;
    student.major = major;
    student.gpa = gpa;
    res.json({
        message: "Student updated successfully!",
        student
    });
});

app.delete("/students/:id", (req, res) => {
    const studentID = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentID);
    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found."});
    }

    const deletedStudent = students.splice(studentIndex, 1);
    res.json({
        message: "Student deleted successfully.",
        deletedStudent: deletedStudent[0]
    });
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
