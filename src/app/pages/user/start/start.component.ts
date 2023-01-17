import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid: any;
  questions: any;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;

  constructor(private locationSt: LocationStrategy, private _route: ActivatedRoute, private _question: QuestionService) { }

  ngOnInit() {

    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];

    this.loadQuestions()
  }
  loadQuestions() {
    this._question.getQuestionsByQuizforUser(this.qid).subscribe(
      (data: any) => {

        this.questions = data;
        this.timer = this.questions.length * 1 * 60;
        this.questions.forEach((q: any) => {
          q['givenAnswer'] = "";

        });

        this.startTimer();
      },
      (error) => {
        console.log(error);
        Swal.fire("Error!!,Server loading data error!!")
      }
    )
  }

  preventBackButton() {

    history.pushState(null, "null", location.href);
    this.locationSt.onPopState(() => {

      history.pushState(null, "null", location.href);
    })
  }


  submitQuiz() {
    Swal.fire({
      title: 'Do you want to start Submit ?',
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {


        this.evalQuiz();



      }
    })
  }

  startTimer() {
    let t = window.setInterval(() => {

      if (this.timer <= 0) {
        // this.submitQuiz();
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }

    }, 1000)
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    this.isSubmit = true;
    this.questions.forEach((q: any) => {

      if (q.givenAnswer == q.answer) {
        this.correctAnswers++
        let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
        this.marksGot += marksSingle;
      }

      if (q.givenAnswer.trim() != '') {
        this.attempted++;
      }


    }
    );

  }


  printPage() {
    window.print();
  }

}
