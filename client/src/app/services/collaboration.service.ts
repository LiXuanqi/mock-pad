import { Injectable } from '@angular/core';

declare var io: any;
declare var ace: any;

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  collaborationSocket: any;

  constructor() { }

  init(editor: any, sessionId: string): void {
    this.collaborationSocket = io(window.location.origin, { query: 'sessionId=123'});
    
    // code changes received from server.
    this.collaborationSocket.on("change", (delta: string) => {
      console.log("collaboration editor changes by " + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });
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
