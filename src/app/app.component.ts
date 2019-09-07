import { Component, OnInit } from '@angular/core';
import { NotesService } from './services/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  isSidebarActive: boolean;

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit() {
    this.isSidebarActive = true;
    this.notesService.toggleSidebar.subscribe(() => {
      this.isSidebarActive = !this.isSidebarActive;
    });
  }
}
