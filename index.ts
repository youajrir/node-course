import { readFileSync, writeFileSync } from 'fs';
import { Student } from './models/Student';
import { Note } from './models/Note';
import { Subject } from './models/Subject';

//add students
function addStudents(student: Student) {
    const studentsData = readFileSync('students.json');
    try {
        const students = JSON.parse(studentsData.toString());
        for (let i = 0; i < students.length; i++) {
            if (students[i].name === student.name) {
                console.log(`${student.name} already exists in students.json`);
                return;
            }
        }
        students.push(student);
        writeFileSync('students.json', JSON.stringify(students));
    } catch (e) {
        console.log('Error parsing students.json:', e);
    }
}

//add subjects
function addSubjects(subject: Subject) {
    const subjectsData = readFileSync('subjects.json');
    try {
        const subjects = JSON.parse(subjectsData.toString());
        for (let i = 0; i < subjects.length; i++) {
            if (subjects[i].subjectName === subject.subjectName) {
                console.log(`${subject.subjectName} already exists in subjects.json`);
                return;
            }
        }
        subjects.push(subject);
        writeFileSync('subjects.json', JSON.stringify(subjects));
    } catch (e) {
        console.log('Error parsing subjects.json:', e);
    }
}


function addMarkForStudent(studentName: String, subjectName: String, grade: number) {
    const studentsData = readFileSync('students.json');
    const subjectsData = readFileSync('subjects.json');


    const students = JSON.parse(studentsData.toString());
    const subjects = JSON.parse(subjectsData.toString());

    try {
        const filteredStudent = students.find((s: Student) => s.name === studentName)
        if (filteredStudent === undefined) {
            console.log('student doesnt exist');
            return
        }

        const filteredSubject = subjects.find((s: Subject) => s.subjectName === subjectName)
        if (filteredSubject === undefined) {
            console.log('subject doesnt exist');
            return
        }

        const note = new Note(filteredSubject, grade)
        filteredStudent.Note = note

students.forEach((s:Student) => {
    if (s.name===filteredStudent.name) {
        s===filteredStudent
    }
});

writeFileSync('students.json', JSON.stringify(students));

    } catch (error) {
        console.log('error when trying to add grade to student' + error);
    }


}

const math = new Subject('Math')
const history = new Subject('History')

const mathNote: Note = { subject: math, grade: 9 };
const historyNote: Note = { subject: history, grade: 8 };

const yassin = new Student('yassin', 30, [mathNote, historyNote])

addStudents(yassin)
addSubjects(math)
addSubjects(history)

addMarkForStudent('bilal', 'Math', 10)
addMarkForStudent('yassin', 'biology', 10)
addMarkForStudent('yassin', 'Math', 20)