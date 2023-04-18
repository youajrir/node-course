import { Note } from './Note';
export class Student {
  name: string;
  age: number;
  notes: Note[];

  constructor(name: string, age: number, notes: Note[]) {
    this.name = name;
    this.age = age;
    this.notes = notes;
  }}