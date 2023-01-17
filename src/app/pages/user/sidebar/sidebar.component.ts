import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

//categories:any;


  
categories=[{
  cid:0,
  title:'',
  description:'' 

}]

  constructor(private _cat:CategoryService,private login:LoginService){}
  ngOnInit(): void {
      this._cat.categories().subscribe((data:any)=>{

        this.categories=data;
      },
      (error)=>{
        Swal.fire("Category loding error!!");
      }
      )
  }


  
  public logout(){
    this.login.logout();
    
  // this.login.loginStatusSubject.next(false);
    window.location.reload();
  }

}
