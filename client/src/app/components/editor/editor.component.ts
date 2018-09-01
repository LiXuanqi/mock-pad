import { Component, OnInit } from '@angular/core';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;

  defaultContent = `public class Example {
    public static void main(String[] args) {
        // Type your Java code here
    }
}`

  constructor() { }

  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();
    this.editor.session.setMode("ace/mode/javascript");
    document.getElementsByTagName('textarea')[0].focus(); // focus on editor when enter the page.
    
    // code change.
    this.editor.on('change', (e) => {
      console.log('editor changes: ' + JSON.stringify(e));
    });
    // cursor change.
    this.editor.getSession().getSelection().on("changeCursor", () => {
      let cursor = this.editor.getSession().getSelection().getCursor();
      console.log('cursor moves: ' + JSON.stringify(cursor));
    });
  }

  private resetEditor(): void {
    this.editor.setValue(this.defaultContent);
  }

}
