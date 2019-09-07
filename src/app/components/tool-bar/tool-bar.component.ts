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
    const note = {
      text: this.notesService.text,
      createdDate: new Date()
    };
    this.notesService.addNote(note);
    this.notesService.text = '';
  }

  toogleSideBar() {
    this.notesService.toggleSidebar.emit();
  }
}
