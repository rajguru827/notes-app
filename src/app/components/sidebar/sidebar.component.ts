import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../interfaces/note';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  noteList: Observable<Note[]>;

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit() {
    this.noteList = this.notesService.noteList;
  }

}
