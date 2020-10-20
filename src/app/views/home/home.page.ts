import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {

  public filter:string;
  public showFilter:boolean = false;

  @ViewChild('inputfilter', { static: false }) set input(input: ElementRef) {
    if(input) { // initially setter gets called with undefined
        this.inputFilter = input;
        this.inputFilter.setFocus();
    }
  }

  public inputFilter: any;
  
  constructor(
    public notesService: NotesService,
    private navCtrl: NavController){

  }

  ngOnInit(){
    this.notesService.load();
  }

  searchNote() {
    this.showFilter = true;
  }

  closeSearch() {
    this.showFilter = false;
    this.filter = undefined;
  }

  addNote(){

    let id = this.notesService.createNote();

    //Navigate to note detail
    this.navCtrl.navigateForward('/notes/' + id);
  }

}