import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  Qid: any; //jakonu name variable
  Quizzes: any; //jakonu name variable
  constructor(private route: ActivatedRoute, private _quiz: QuizService, private _router:Router) { }

  ngOnInit(): void {
    this.Qid = this.route.snapshot.params['quizid']  //parina=app routing module.ts instructions path variable
    this._quiz.getquiz(this.Qid).subscribe((data: any) => {
      this.Quizzes = data;
      console.log(data);
    },
      (error) => {
        Swal.fire("Error in loading data");
      });

  }

  public startQuiz() {

    Swal.fire({
      title:'Do you want to start Test',
      showCancelButton:true,
      confirmButtonText:"Yes, Start quiz"
    }).then((result)=>{
      if(result.isConfirmed){
        this._router.navigate(['/start/'+this.Qid]);
        
      }else if(result.isDenied){
          Swal.fire("change are not saved!!");
      }
    })
    
  }
  
   





}
