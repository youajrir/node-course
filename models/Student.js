"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
var Note_1 = require("./Note");
var Student = /** @class */ (function () {
    function Student(name, age, notes) {
        this.name = name;
        this.age = age;
        this.notes = notes;
    }
    return Student;
}());
exports.Student = Student;
function addNoteForSubject(subject, grade) {
    var note = new Note_1.Note(subject, grade);
    this.notes.push(note);
}
