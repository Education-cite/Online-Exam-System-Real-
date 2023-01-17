import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {


  categories = [
    {
      cid:'',
      title:''
    }
  ]

  quizData = {

    title: '',
    description: '',
    maxMarks: '',
    numberofQuestions: '',
    active: true,
    category: {
      cid: '',
      
    },
  };


  constructor(private _cat: CategoryService, private _quiz: QuizService) { }

  ngOnInit() {

    this._cat.categories().subscribe(
      (data: any) => {

        this.categories = data;
        console.log(this.categories);
      },

      (error) => {
        console.log(error);
        Swal.fire("Error !!","Error in loading data ",'error');

      }
    );
  }

  addQuiz() {

    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      Swal.fire("Title Required!!");
    }

    this._quiz.addquiz(this.quizData).subscribe(

      (data) => {

        Swal.fire("Success","Quizz added successfully","success");
      }
    )
  }

}
