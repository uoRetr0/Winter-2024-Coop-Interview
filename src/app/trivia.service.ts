import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private root = 'https://opentdb.com/api.php';
  
  constructor(private http: HttpClient) {}

  getQuestion(amount: number, difficulty: string, type: string, category: number): Observable<any> {
    
    const url = `${this.root}?amount=${amount}&difficulty=${difficulty}&type=${type}&category=${category}`;

    return this.http.get(url);
  }

}
