import * as yargs from 'yargs';
import { Student } from './models/Student';
import { Subject } from './models/Subject';
import { addStudents, addSubjects, addMarkForStudent, updateSubject, deleteSubject, listMarks, deleteMark } from './app';

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

//List marks
// to run the command via terminal example : 
// node index.js listMarks --name John 

yargs.command({
    command: 'listMarks',
    describe: 'List all marks of a student',
    builder: {
        name: {
            describe: 'Student name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        listMarks(argv.name);
    }
});

//Delete mark
// to run the command via terminal example : 
// node index.js deleteMark --name John --subjectName Sports

yargs.command({
    command: 'deleteMark',
    describe: 'Delete a mark of a student',
    builder: {
        name: {
            describe: 'Student name',
            demandOption: true,
            type: 'string'
        },
        subjectName: {
            describe: 'subject name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        deleteMark(argv.name, argv.subjectName);
    }
});

//update subjects
// to run the command via terminal example : 
// node index.js updateSubject --oldSubjectName Sports --newSubjectName Test
yargs.command({
    command: 'updateSubject',
    describe: 'update existing subject',
    builder: {
        oldSubjectName: {
            describe: 'Subject name',
            demandOption: true,
            type: 'string'
        },
        newSubjectName: {
            describe: 'Subject name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        listMarks(argv.name);
        console.log('handler updateSubject start')
        const oldsubject = new Subject(argv.oldSubjectName);
        const newsubject = new Subject(argv.newSubjectName);
        updateSubject(oldsubject, newsubject);
    }
});
//delete subjects
// to run the command via terminal example : 
// node index.js deleteSubject --toDeleteSubjectName Test
yargs.command({
    command: 'deleteSubject',
    describe: 'delete subject',
    builder: {
        toDeleteSubjectName: {
            describe: 'Subject name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const subject = new Subject(argv.toDeleteSubjectName);
        deleteSubject(subject);
    }
});
yargs.parse();