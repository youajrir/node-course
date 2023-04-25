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

//Delete mark
export function deleteMark(studentName: string, subjectName: string) {

    const studentsData = fs.readFileSync('students.json');
    const students = JSON.parse(studentsData.toString());
    const StudentsToKeep = students.filter((student: Student) => student.name !== studentName)
    const filteredStudent = students.find((s: Student) => s.name === studentName)
    debugger
    if (filteredStudent === undefined) {
        console.log('student doesnt exist');
        return
    }

    const newNotes: Note[] = [];
    filteredStudent.notes.forEach((note: Note) => {
        if (note.subject.subjectName !== subjectName) {
            newNotes.push(note)
        }
    });

    const updatedStudent = new Student(filteredStudent.name, filteredStudent.age, newNotes)

    StudentsToKeep.push(updatedStudent);
    fs.writeFileSync('students.json', JSON.stringify(StudentsToKeep));

}

//update subject
export function updateSubject(oldSubject: Subject, newSubject: Subject) {
    var subjectsData = fs.readFileSync('subjects.json');
    try {
        var subjects = JSON.parse(subjectsData.toString());
        for (var i = 0; i < subjects.length; i++) {
            if (subjects[i].subjectName === oldSubject.subjectName) {

                subjects[i].subjectName = newSubject.subjectName;

            }
        }
        fs.writeFileSync('subjects.json', JSON.stringify(subjects));
    }
    catch (e) {
        console.log('Error parsing subjects.json:', e);
    }

}
// delete subject
export function deleteSubject(subject: Subject) {
    var subjectsData = fs.readFileSync('subjects.json');
    try {
        var subjects = JSON.parse(subjectsData.toString());
        for (var i = 0; i < subjects.length; i++) {
            if (subjects[i].subjectName === subject.subjectName) {
                console.log('key', i);
                subjects.splice(i, 1);
            }
        }
        fs.writeFileSync('subjects.json', JSON.stringify(subjects));
    }
    catch (e) {
        console.log('Error parsing subjects.json:', e);
    }
}

// List All Marks Of Each Subject
export function viewAllMarksOfEachSubject() {
    const studentsData = fs.readFileSync('students.json');
    const subjectsData = fs.readFileSync('subjects.json');
    const students = JSON.parse(studentsData.toString());
    const subjects = JSON.parse(subjectsData.toString());
  
    subjects.forEach((subject: Subject) => {
      console.log(`Marks for ${subject.subjectName}:`);
      students.forEach((student: Student) => {
        const note = student.notes.find((note: Note) => note.subject.subjectName === subject.subjectName);
        if (note) {
          console.log(`${student.name}: ${note.grade}`);
        } else {
          console.log(`${student.name}: N/A`);
        }
      });
      console.log();
    });
  }
  

//Calculate the final mark
// Calculate final mark for a student
export function calculateFinalMark(studentName: string) {
    const studentsData = fs.readFileSync('students.json');
    const students = JSON.parse(studentsData.toString());
  
    const filteredStudent = students.find((s: Student) => s.name === studentName);
    if (filteredStudent === undefined) {
      console.log('Student does not exist');
      return;
    }
  
    const notes = filteredStudent.notes;
    const totalMark = notes.reduce((acc : number, note:Note) => acc + note.grade, 0);
    const finalMark = totalMark / notes.length;
  
    console.log(`Final mark for ${studentName}: ${finalMark}`);
  }
