import * as fs from 'fs';
import { Student } from './models/Student';
import { Note } from './models/Note';
import { Subject } from './models/Subject';

//add students
export function addStudents(student: Student) {
    const studentsData = fs.readFileSync('students.json');
    try {
        const students = JSON.parse(studentsData.toString());
        for (let i = 0; i < students.length; i++) {
            if (students[i].name === student.name) {
                console.log(`${student.name} already exists in students.json`);
                return;
            }
        }
        students.push(student);
        fs.writeFileSync('students.json', JSON.stringify(students));
    } catch (e) {
        console.log('Error parsing students.json:', e);
    }
}

//add subjects
export function addSubjects(subject: Subject) {
    const subjectsData = fs.readFileSync('subjects.json');
    try {
        const subjects = JSON.parse(subjectsData.toString());
        for (let i = 0; i < subjects.length; i++) {
            if (subjects[i].subjectName === subject.subjectName) {
                console.log(`${subject.subjectName} already exists in subjects.json`);
                return;
            }
        }
        subjects.push(subject);
        fs.writeFileSync('subjects.json', JSON.stringify(subjects));
    } catch (e) {
        console.log('Error parsing subjects.json:', e);
    }
}

//add mark for student
export function addMarkForStudent(studentName: String, subjectName: String, grade: number) {
    const studentsData = fs.readFileSync('students.json');
    const subjectsData = fs.readFileSync('subjects.json');


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

        const existingNoteIndex = filteredStudent.notes.findIndex((note: Note) => note.subject.subjectName === subjectName);
        if (existingNoteIndex !== -1) {
            const oldNote = filteredStudent.notes[existingNoteIndex];
            filteredStudent.notes = filteredStudent.notes.filter((note: Note) => note !== oldNote);
        }

        const newNote = new Note(filteredSubject, grade);
        filteredStudent.notes.push(newNote)

        const StudentsToKeep = students.filter((student: Student) => student.name !== studentName)
        console.log(filteredStudent);

        StudentsToKeep.push(filteredStudent)



        fs.writeFileSync('students.json', JSON.stringify(StudentsToKeep));

    } catch (error) {
        console.log('error when trying to add grade to student' + error);
    }


}


//List marks
export function listMarks(studentName: string) {
    const studentsData = fs.readFileSync('students.json');
    const students = JSON.parse(studentsData.toString());

    const filteredStudent = students.find((s: Student) => s.name === studentName)
    if (filteredStudent === undefined) {
        console.log('student doesnt exist');
        return
    }

    console.log(filteredStudent.notes)
}
