import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{

  qid:any;
  qtitle:any;
    questions=[
      {
        quesId:'',
        content:'',
        option1:'',
        option2:'',
        option3:'',
        option4:'',
        answer:''
      }
    ];



  constructor(private _route:ActivatedRoute,private _question:QuestionService){}
  ngOnInit(): void {
    this.qid=this._route.snapshot.params['qid'];
    this.qtitle=this._route.snapshot.params['title']
   // console.log(this.qid);
   // console.log(this.qtitle);

   this._question.getquestionsofquiz(this.qid).subscribe((data:any)=>{
    this.questions=data;
    console.log(data);
   },
   (error)=>{
    console.log(error);
   }
   )
  }  

  delete(quesId:any){
   
    Swal.fire({
      title:'Are you sure want to delete',
      confirmButtonText:'Yes Delete',
      showCancelButton:true,
      icon:'info'
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deletequestion(quesId).subscribe((data:any)=>{
          
         this.questions= this.questions.filter((question:any)=>question.quesId!=quesId);
        },
        (error:any)=>{
          console.log(error)
        
      })
      }
    })
   
   
   

}

}
