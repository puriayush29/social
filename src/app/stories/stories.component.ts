
import { Component, OnInit} from '@angular/core';
import '@gugadev/wc-stories';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent {

  constructor(public dialog:MatDialog) { }

  openDialog()
  {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:${result}`);
    });
  }
  
 
  width  = 320;
  height = 480;

  stories = [
    'https://i.imgur.com/T4jwXEX.png',
    'https://i.imgur.com/AY5z4ZP.jpg',
    'https://i.imgur.com/HJBbtOI.jpg',
    'https://i.imgur.com/tXgQukC.jpg',
    'https://i.imgur.com/A7BMaSe.jpg'
  ]
  
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {
emojies:any;
char:any;
  handleSelection(event)
  {
   this.emojies = event.char;
   this.char = event.char;
 
  }
  
}
