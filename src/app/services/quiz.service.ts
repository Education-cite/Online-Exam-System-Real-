import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }


  public getQuizzes(){
    return this.http.get(`${baseUrl}/quiz/`)

  }


  public addquiz(quiz:any){
    return this.http.post(`${baseUrl}/quiz/`,quiz)
  }


public getquiz(qid:any){
  return this.http.get(`${baseUrl}/quiz/${qid}`)
}

public updatequiz(quiz:any){
  return this.http.post(`${baseUrl}/quiz/`,quiz)
}

public deletequiz(qid:any){
 return this.http.delete(`${baseUrl}/quiz/${qid}`)
}

public getQuizesOfcategory(cid:any){
  return this.http.get(`${baseUrl}/quiz/category/${cid}`)
  
}


public getActiveQuizzes(){
  return this.http.get(`${baseUrl}/quiz/active`);
}


public getActiveQuizzesofCategory(cid:any){
  return this.http.get(`${baseUrl}/quiz/category/active/${cid}`)
}








}
