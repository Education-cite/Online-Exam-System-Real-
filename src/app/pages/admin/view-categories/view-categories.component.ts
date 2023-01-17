import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  
categories=[
  { 
    cid:'',
    title:'',
    description:'',
    category:''
  }
]




constructor(private _category:CategoryService){}

  ngOnInit(): void {
      this._category.categories().subscribe(
        (data:any)=>{
          this.categories=data;
          console.log(data);
        },
        (error)=>{
          console.log(error);
          Swal.fire("Error !!","Error in loading data ",'error');
        }
      )
  }

  
  deletecategory(cid:any){
   
    Swal.fire({
      title:'Are you sure want to delete',
      confirmButtonText:'Yes Delete',
      showCancelButton:true,
      icon:'info'
    }).then((result)=>{
      if(result.isConfirmed){
        this._category.deletecategory(cid).subscribe((data:any)=>{
        this.categories=this.categories.filter((category)=>category.cid != cid);

            Swal.fire("category deleted");
          
        },
        (error:any)=>{
          console.log(error)
        
      })
      }
    })
   
   
   

}
}
