import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http) { }

  buildAndRun(data): Promise<Object> {
    let options = {
      headers: new Headers({'content-type': 'application/json'})
    }
    return this.http.post('/api/v1/build_and_run', data, options)
      .toPromise()
      .then((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.body || error);
  }
}
