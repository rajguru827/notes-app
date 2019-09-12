import { Injectable, EventEmitter } from '@angular/core';
import { Note } from '../interfaces/note';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public toggleSidebar: EventEmitter<any> = new EventEmitter();
  private _text: string;
  private _searchTerm: string;
  private _notesList$ = new BehaviorSubject<Note[]>([]);
  private _selectedNote = new BehaviorSubject<Note>(null);
  private storage: StorageService;

  constructor(
    private _storageService: StorageService
  ) {
    this.storage = _storageService;
    if (this.storage.retrieve('noteList') && this.storage.retrieve('noteList').length) {
      this._notesList$.next(this.storage.retrieve('noteList'));
    }
  }

  get text() {
    return this._text;
  }

  set text(note: string) {
    this._text = note;
    if (note && this._selectedNote.getValue()) {
      const selNote = this._selectedNote.getValue();
      selNote.text = this._text;
      this._selectedNote.next(selNote);
    }
  }

  get searchTerm() {
    return this._searchTerm;
  }

  set searchTerm(searchTerm: string) {
    this._searchTerm = searchTerm;
  }

  get noteList() {
    return this._notesList$.asObservable();
  }

  set selectedNote(note: Note) {
    this._selectedNote.next(note);
    if (this._selectedNote.getValue()) {
      this.text = this._selectedNote.getValue().text;
    }
  }

  get selectedNote() {
    return this._selectedNote.getValue();
  }

  get noteListCount() {
    return this._notesList$.getValue().length;
  }

  addNote(note: Note) {
    this._notesList$.next(this._notesList$.getValue().concat([note]));
    this.storage.store('noteList', this._notesList$.getValue());
  }

  updateNote(note: Note) {
    const noteList: Note[] = [];
    this._notesList$.getValue().map(item => {
      if (item.id === note.id) {
        item = note;
      }
      noteList.push(item);
    });
    this._notesList$.next(noteList);
    this.storage.store('noteList', this._notesList$.getValue());
  }

  deleteNote() {
    if (this.selectedNote) {
      const notes: Note[] = this._notesList$.getValue();
      notes.forEach((item, index) => {
        if (item === this.selectedNote) { notes.splice(index, 1); }
      });
      this._notesList$.next(notes);
    }
    this.storage.store('noteList', this._notesList$.getValue());
    this.selectedNote = null;
  }

}