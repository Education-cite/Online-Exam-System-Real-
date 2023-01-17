import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{

  qid=0;
  quiz: any;
  category:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _cat:CategoryService,private _router:Router){}

  ngOnInit(): void {

    this.qid=this._route.snapshot.params['qid'];
    this._quiz.getquiz(this.qid).subscribe((data:any)=>{
      this.quiz=data;
      console.log(this.quiz);
    },
    (error)=>{
      console.log(error);
    }
    )


      this._cat.categories().subscribe((data:any)=>{

        this.category=data;
      },
      (error)=>{
        Swal.fire("error in loading data!!");
      }
      )

  }


 
public formSubmit() {
  this._quiz.updatequiz(this.quiz).subscribe(
    (data:any)=>{
      Swal.fire("Updated !!","Quiz updated successfully ",'success').then(
        (e)=>{
          this._router.navigate(['/admin/quizzes']);
        }
      );
    }
  ),
  (error:any)=>{
    Swal.fire("Error !!","Quiz updated faild ",'error');
  }
}



}
