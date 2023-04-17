"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var Student_1 = require("./models/Student");
var Note_1 = require("./models/Note");
var Subject_1 = require("./models/Subject");
//add students
function addStudents(student) {
    var studentsData = (0, fs_1.readFileSync)('students.json');
    try {
        var students = JSON.parse(studentsData.toString());
        for (var i = 0; i < students.length; i++) {
            if (students[i].name === student.name) {
                console.log("".concat(student.name, " already exists in students.json"));
                return;
            }
        }
        students.push(student);
        (0, fs_1.writeFileSync)('students.json', JSON.stringify(students));
    }
    catch (e) {
        console.log('Error parsing students.json:', e);
    }
}
//add subjects
function addSubjects(subject) {
    var subjectsData = (0, fs_1.readFileSync)('subjects.json');
    try {
        var subjects = JSON.parse(subjectsData.toString());
        for (var i = 0; i < subjects.length; i++) {
            if (subjects[i].subjectName === subject.subjectName) {
                console.log("".concat(subject.subjectName, " already exists in subjects.json"));
                return;
            }
        }
        subjects.push(subject);
        (0, fs_1.writeFileSync)('subjects.json', JSON.stringify(subjects));
    }
    catch (e) {
        console.log('Error parsing subjects.json:', e);
    }
}
function addMarkForStudent(studentName, subjectName, grade) {
    var studentsData = (0, fs_1.readFileSync)('students.json');
    var subjectsData = (0, fs_1.readFileSync)('subjects.json');
    var students = JSON.parse(studentsData.toString());
    var subjects = JSON.parse(subjectsData.toString());
    try {
        var filteredStudent_1 = students.find(function (s) { return s.name === studentName; });
        if (filteredStudent_1 === undefined) {
            console.log('student doesnt exist');
            return;
        }
        var filteredSubject = subjects.find(function (s) { return s.subjectName === subjectName; });
        if (filteredSubject === undefined) {
            console.log('subject doesnt exist');
            return;
        }
        var note = new Note_1.Note(filteredSubject, grade);
        filteredStudent_1.Note = note;
        students.forEach(function (s) {
            if (s.name === filteredStudent_1.name) {
                s === filteredStudent_1;
            }
        });
        (0, fs_1.writeFileSync)('students.json', JSON.stringify(students));
    }
    catch (error) {
        console.log('error when trying to add grade to student' + error);
    }
}
var math = new Subject_1.Subject('Math');
var history = new Subject_1.Subject('History');
var mathNote = { subject: math, grade: 9 };
var historyNote = { subject: history, grade: 8 };
var yassin = new Student_1.Student('yassin', 30, [mathNote, historyNote]);
addStudents(yassin);
addSubjects(math);
addSubjects(history);
addMarkForStudent('bilal', 'Math', 10);
addMarkForStudent('yassin', 'biology', 10);
addMarkForStudent('yassin', 'Math', 20);
