import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private _text: string;
  private _notesList$ = new BehaviorSubject<Note[]>([]);

  constructor() { }

  get text() {
    return this._text;
  }

  set text(note: string) {
    this._text = note;
  }

  get noteList() {
    return this._notesList$.asObservable();
  }

  addNote(note: Note) {
    this._notesList$.next(this._notesList$.getValue().concat([note]));
  }

}
