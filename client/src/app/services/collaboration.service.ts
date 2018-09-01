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
    this.collaborationSocket = io(window.location.origin, { query: 'message=123'});
    
    // code changes received from server.
    this.collaborationSocket.on("change", (delta: string) => {
      console.log("collaboration editor changes by " + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    
  }
}
