import * as fs from 'fs';
import { MongoClient, MongoClientOptions, Db } from 'mongodb';
import { Student } from './models/Student';
import { Note } from './models/Note';
import { Subject } from './models/Subject';
import { connectToDatabase } from './mongodb';


//add students
export async function addStudents(student: Student) {
    const [client, db] = await connectToDatabase();

    try {
        const studentsCollection = db.collection('students');
        const existingStudent = await studentsCollection.findOne({ name: student.name });


        if (existingStudent != undefined) {
            console.log('Student already exists');
            return;
        } else {
            const newStudent = await studentsCollection.insertOne(student);
            console.log('New student added: ' + student.name);
        }
    } catch (e) {
        console.log('Error while trying to retrieve student data from the database:', e);
        throw e;
    } finally {
        if (client) {
            await client.close();
        }
    }
}


//add subjects
export async function addSubjects(subject: Subject) {
    const [client, db] = await connectToDatabase();

    try {
        const subjectsCollection = db.collection('subjects');
        const existingSubject = await subjectsCollection.findOne({ subjectName: subject.subjectName });

        if (existingSubject != undefined) {
            console.log('Subject already exists');
            return;
        } else {
            const newSubject = await subjectsCollection.insertOne(subject);
            console.log('New subject added: ' + subject.subjectName);
        }
    } catch (e) {
        console.log('Error while trying to retrieve subject data from the database:', e);
        throw e;
    } finally {
        if (client) {
            await client.close();
        }
    }
}

//add mark for student
export async function addMarkForStudent(studentName: string, subjectName: string, grade: number) {
    const [client, db] = await connectToDatabase();

    try {
        const studentsCollection = db.collection('students');
        const subjectsCollection = db.collection('subjects');

        const student = await studentsCollection.findOne({ name: studentName });
        if (!student) {
            console.log('Student not found');
            return;
        }

        const subject = await subjectsCollection.findOne({ subjectName });
        if (!subject) {
            console.log('Subject not found');
            return;
        }

        student.notes = Array.from(student.notes);

        const addNote = new Note(new Subject(subjectName), grade);
        student.notes.push(addNote);

        await studentsCollection.updateOne({ name: student.name }, { $set: { notes: student.notes } });
        

        console.log(`Grade added for student ${studentName}`);
    } catch (error) {
        console.log(`Error adding grade for student ${studentName}: ${error}`);
    } finally {
        if (client) {
            await client.close();
        }
    }
}



//List marks
export async function listMarks(studentName: string) {
    const [client, db] = await connectToDatabase();
  
    try {
      const studentsCollection = db.collection('students');
      const filteredStudent = await studentsCollection.findOne({ name: studentName });
  
      if (filteredStudent === null) {
        console.log('Student does not exist');
        return;
      }
  
      console.log(filteredStudent.notes);
    } catch (e) {
      console.log('Error while trying to list marks for a student:', e);
      throw e;
    } finally {
      if (client) {
        await client.close();
      }
    }
  }

// Delete a mark for a student
export async function deleteMark(studentName: string, subjectName: string) {
    const [client, db] = await connectToDatabase();
  
    try {
      const studentsCollection = db.collection('students');
      const filteredStudent = await studentsCollection.findOne({ name: studentName });
  
      if (filteredStudent === null) {
        console.log('Student does not exist');
        return;
      }
  
      const newNotes: Note[] = [];
      filteredStudent.notes.forEach((note: Note) => {
        if (note.subject.subjectName !== subjectName) {
          newNotes.push(note);
        }
      });
  
      const updatedStudent = {
        ...filteredStudent,
        notes: newNotes
      };
  
      const result = await studentsCollection.updateOne({ name: studentName }, { $set: updatedStudent });
  
      console.log(`${result.modifiedCount} mark(s) deleted for ${studentName}`);
    } catch (e) {
      console.log('Error while trying to delete a mark:', e);
      throw e;
    } finally {
      if (client) {
        await client.close();
      }
    }
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
    const totalMark = notes.reduce((acc: number, note: Note) => acc + note.grade, 0);
    const finalMark = totalMark / notes.length;

    console.log(`Final mark for ${studentName}: ${finalMark}`);
}
