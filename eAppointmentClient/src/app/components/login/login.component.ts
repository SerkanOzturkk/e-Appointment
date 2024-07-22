import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginModel } from '../../models/login.model';
import { FormValidateDirective } from 'form-validate-angular';
import { HttpService } from '../../services/http.service';
import { LoginResponseModel } from '../../models/login-response.model';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { RoleModel } from '../../models/role.model';
import { SwalService } from '../../services/swal.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserPipe } from '../../pipe/user.pipe';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FormValidateDirective, UserPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  users: UserModel[] = [];  
  roles: RoleModel[] = [];

  @ViewChild("addModalCloseBtn") addModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;

  createModel: UserModel = new UserModel();
  updateModel: UserModel = new UserModel();

  login: LoginModel = new LoginModel();

  @ViewChild("password") password : ElementRef<HTMLInputElement> | undefined;

  constructor(
    private http: HttpService,
    private router: Router,
    private swal: SwalService

  ){}

  showOrHidePassword(){
    if(this.password === undefined) return;
    
    if(this.password.nativeElement.type === "password"){
      this.password.nativeElement.type = "text";
    }else{
      this.password.nativeElement.type = "password";
    }
  }

  signIn(form:NgForm){
    if(form.valid){
      this.http.post<LoginResponseModel>("Auth/Login",this.login,(res)=> {
        localStorage.setItem("token", res.data!.token);
        this.router.navigateByUrl("/");
      })
    }
  }

  add(form: NgForm){
    if(form.valid){
      this.http.post<string>("Users/Create",this.createModel,(res)=> {
        this.swal.callToast(res.data,"success");
        this.addModalCloseBtn?.nativeElement.click();
        this.createModel = new UserModel();
      });
    }
  }

  getAllRoles(){
    this.http.post<RoleModel[]>("Users/GetAllRoles",{}, res=> {
      this.roles = res.data;
    });
  }


  search: string = "";

  

  ngOnInit(): void {
    this.getAll();
    this.getAllRoles();
  }

  getAll(){
    this.http.post<UserModel[]>("Users/GetAll", {}, (res)=> {
      this.users = res.data;
    });
  }

  

  delete(id: string, fullName: string){
    this.swal.callSwal("Delete user?",`You want to delete ${fullName}?`,()=> {
      this.http.post<string>("Users/DeleteById", {id: id}, (res)=> {
        this.swal.callToast(res.data,"info");
        this.getAll();
      })
    })
  }

  get(data: UserModel){    
    this.updateModel = {...data};
    console.log(this.updateModel);
        
  }

  update(form:NgForm){
    if(form.valid){
      this.http.post<string>("Users/Update",this.updateModel,(res)=> {
        this.swal.callToast(res.data,"success");
        this.getAll();
        this.updateModalCloseBtn?.nativeElement.click();        
      });
    }
  }

}