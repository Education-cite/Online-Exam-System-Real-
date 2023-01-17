import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

qid:any;
qtitle:any;

question={
  content:'',
  option1:'',
  option2:'',
  option3:'',
  option4:'',
  answer:'',
  quiz:{
    qid:'',
    title:''
  }


}

  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _rout:Router){}
  ngOnInit(): void {

      this.qid=this._route.snapshot.params['qid']
      this.question.quiz['qid']=this.qid;    //  console.log(this.qid);
      this.qtitle = this._route.snapshot.params['qtitle'];


  }


  addQuestion(){

    if(this.question.content.trim()=='' || this.question.content==null){
      Swal.fire("please fiil the content Field!!");
      return;
  }

  if(this.question.option1.trim()=='' || this.question.option1==null){
    Swal.fire("please fiil the option1 Field!!");
    return;
}

if(this.question.option2.trim()=='' || this.question.option2==null){
  Swal.fire("please fiil the option2 Field!!");
  return;
}

if(this.question.answer.trim()=='' || this.question.answer==null){
  Swal.fire("please fiil the Anawer Field!!");
return;
}

this._question.addquestion(this.question).subscribe(
(data:any)=>{

  Swal.fire("Question Added successfully!!").then((e)=>{
    this._rout.navigate(['/admin/question/'+this.qid+'/'+this.qtitle]);
  
  });
  this.question.content='';
  this.question.option1='';
  this.question.option2='';
  this.question.option3='';
  this.question.option4='';
  this.question.answer='';
  
},
(error)=>{
  Swal.fire("Server loading error!!");
}
)


}


  }









