import * as yargs from 'yargs';
import { Student } from './models/Student';
import { Subject } from './models/Subject';
import { addStudents, addSubjects, addMarkForStudent } from './app';

//add students
// to run the command via terminal example : 
// node index.js addStudent --name John --age 20

yargs.command({
    command: 'addStudent',
    describe: 'Add a new student',
    builder: {
        name: {
            describe: 'Student name',
            demandOption: true,
            type: 'string'
        },
        age: {
            describe: 'Student age',
            demandOption: true,
            type: 'number'
        }
    },
    handler(argv) {
        const student = new Student(argv.name, argv.age, []);
        addStudents(student);
    }
});

//add subjects
// to run the command via terminal example : 
// node index.js addSubject --subjectName Sports
yargs.command({
    command: 'addSubject',
    describe: 'Add a new subject',
    builder: {
        subjectName: {
            describe: 'Subject name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const subject = new Subject(argv.subjectName);
        addSubjects(subject);
    }
});

//add mark for student
// to run the command via terminal example : 
// addMarkForStudent --studentName John --subjectName Sports --grade 17
yargs.command({
    command: 'addMarkForStudent',
    describe: 'Add a new mark for a student',
    builder: {
        studentName: {
            describe: 'Student name',
            demandOption: true,
            type: 'string'
        },
        subjectName: {
            describe: 'Subject name',
            demandOption: true,
            type: 'string'
        },
        grade: {
            describe: 'Grade',
            demandOption: true,
            type: 'number'
        }
    },
    handler(argv) {
        addMarkForStudent(argv.studentName, argv.subjectName, argv.grade);
    }
});
yargs.parse();
