import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;
  sessionId: string = "";
  buildResult: string;
  runResult: string;

  defaultContent = `public class Example {
    public static void main(String[] args) {
        // Type your Java code here
    }
}`
  constructor(
    @Inject('data') private data,
    @Inject('collaboration') private collaboration,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const sessionId = this.route.snapshot.paramMap.get('sessionId');
    this.sessionId = sessionId;
    this.initEditor();
  }

  private initEditor(): void {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/xcode');
    this.editor.session.setMode("ace/mode/java");
    this.editor.setShowPrintMargin(false);
    this.resetEditor();

    // focus on editor when enter the page.
    document.getElementsByTagName('textarea')[0].focus();
    
    // init websocket
    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    // bind code change Event.
    this.editor.on('change', (e) => {
      console.log('editor changes: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    });

    // bind cursor change Event.
    this.editor.getSession().getSelection().on("changeCursor", () => {
      let cursor = this.editor.getSession().getSelection().getCursor();
      console.log('cursor moves: ' + JSON.stringify(cursor));
      this.collaboration.cursorMove(JSON.stringify(cursor));
    });

    this.collaboration.restoreBuffer();
  }

  submit(): void {
    let userCode = this.editor.getValue();
    let data = {
      user_code: userCode,
      lang: 'java'
    }
    this.data.buildAndRun(data)
      .then((res) => {
        console.log(res);
        this.buildResult = res.build;
        this.runResult = res.run;
      })
    console.log(userCode);
  }

  private resetEditor(): void {
    this.editor.setValue(this.defaultContent);
  }

}
