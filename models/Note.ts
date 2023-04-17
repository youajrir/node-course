import { Subject } from "./Subject";
export class Note {
  subject: Subject;
  grade: number;

  constructor(subject: Subject, grade: number) {
    this.subject = subject;
    this.grade = grade;
  }}