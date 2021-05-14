import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CflService {

  constructor(private http: HttpClient) { }

  getAllGames() {

    const url = 'http://api.cfl.ca/v1/games/2019?key=CvKY9ARhjKja2f9recRI4tLx6hm4JENJ';
    return this.http.get( url );
  }
}

