import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catid: any;
  quizzess: any;

  constructor(private route: ActivatedRoute, private _quiz: QuizService) { }

  ngOnInit(): void {


    //this subscription for every time will  run  onit when link will change
    this.route.params.subscribe((params) => {
      this.catid = params['catid'];




      if (this.catid == 0) {
        //load all quiz
        this._quiz.getActiveQuizzes().subscribe((data: any) => {
          this.quizzess = data;



        },
          (error: any) => {
            //error 
            alert("error in loading all quizzess")
          })

      } else {

        this._quiz.getActiveQuizzesofCategory(this.catid).subscribe((data) => {
          this.quizzess = data;
        },
          (error) => {

            alert("error in loading all quizzess");
          });

      }
    })



  }

}
