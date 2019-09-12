import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  constructor(
    public notesService: NotesService
  ) { }

  ngOnInit() {
  }

  save() {
    if (this.notesService.selectedNote) {
      this.notesService.selectedNote = {
        id: this.notesService.selectedNote.id,
        text: this.notesService.text,
        createdDate: new Date()
      };
      this.notesService.updateNote(this.notesService.selectedNote);
    } else {
      const note = {
        id: this.notesService.noteListCount + 1,
        text: this.notesService.text,
        createdDate: new Date()
      };
      this.notesService.addNote(note);
    }
    this.notesService.text = '';
    this.notesService.selectedNote = null;
  }

  toogleSideBar() {
    this.notesService.toggleSidebar.emit();
  }
}