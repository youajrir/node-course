import { Note } from './Note';
import { Subject } from './Subject';
export class Student {
  name: string;
  age: number;
  notes: Note[];

  constructor(name: string, age: number, notes: Note[]) {
    this.name = name;
    this.age = age;
    this.notes = notes;
  }}

  function addNoteForSubject(this: Student,subject: Subject, grade: number) {
    const note = new Note(subject, grade);
    this.notes.push(note);
  }