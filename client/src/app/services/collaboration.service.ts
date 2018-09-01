import { Injectable } from '@angular/core';
import { COLORS } from '../../assets/colors';

declare var io: any;
declare var ace: any;

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  collaborationSocket: any;
  
  clientsInfo: Object = {};
  clientNum: number = 0;

  constructor() { }

  init(editor: any, sessionId: string): void {
    this.collaborationSocket = io(window.location.origin, { query: `sessionId=${sessionId}`});
    
    // handle change Event from server.
    this.collaborationSocket.on("change", (delta: string) => {
      console.log(`change from server: ${delta}`);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    // handle cursorMove Event from server.
    this.collaborationSocket.on("cursorMove", cursor => {
      console.log(`cursor move from server: ${cursor}`);
      let session = editor.getSession();
      cursor = JSON.parse(cursor);
      const x = cursor['row'];
      const y = cursor['column'];
      const changeClientId = cursor['socketId'];
      console.log(`${x} ${y} ${changeClientId}`)

      // colored cursors for different users.
      if (changeClientId in this.clientsInfo) {
        session.removeMarker(this.clientsInfo[changeClientId]['marker']);
      } else {
        // new user.
        this.clientsInfo[changeClientId] = {};

        let css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".editor_cursor_" + changeClientId
          + "{ position: absolute; background: " + COLORS[this.clientNum] + ";"
          + " z-index: 100; width: 3px !important; }";

        document.body.appendChild(css);
        this.clientNum++;
      }

      // apply cursor changes to editor.
      let Range = ace.require('ace/range').Range;
      let newMarker = session.addMarker(new Range(x, y, x, y + 1), `editor_cursor_${changeClientId}`, true);
      this.clientsInfo[changeClientId]['marker'] = newMarker;
    })
  }

  // emit code change to server.
  change(delta: string): void {
      this.collaborationSocket.emit("change", delta);
  }

  // emit cursor change to server.
  cursorMove(cursor: string): void {
    this.collaborationSocket.emit("cursorMove", cursor);
  }

  restoreBuffer(): void {
    this.collaborationSocket.emit("restoreBuffer");
  }
}
