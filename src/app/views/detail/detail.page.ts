import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Plugins, Capacitor } from '@capacitor/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../interfaces/note';

const { Share } = Plugins;
const shareButtonAvailable = Capacitor.isPluginAvailable('Share');

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public note: Note;
  public showShareButton: boolean;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private navCtrl: NavController) {

    // Initialise a placeholder note until the actual note can be loaded in
    this.note = {
      id: '',
      title: '',
      content: ''
    };

    this.showShareButton = shareButtonAvailable && navigator.share ? true:false;

  }

  ngOnInit() {

    // Get id from URL
    let id = this.route.snapshot.paramMap.get('id');

    if(this.notesService.loaded){
      this.note = this.notesService.getNote(id)
    } else {
      this.notesService.load().then(() => {
        this.note = this.notesService.getNote(id)
      });
    }

  }

  noteChanged() {
    this.notesService.save();
  }

  deleteNote() {
    this.notesService.deleteNote(this.note);
    this.navCtrl.navigateBack('/notes');
  }

  async shareNote() {
    let shareRet = await Share.share({
      title: this.note.title,
      text: this.note.content,
      dialogTitle: 'Share note'
    });
    console.log(shareRet);
  }

}
