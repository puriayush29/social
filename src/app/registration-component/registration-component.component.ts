import { AuthGuard } from './../auth.guard';
import { UserRegistrationService } from './../user-registration.service';
import { Component, OnInit,Output, ComponentFactoryResolver,EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './../user';
@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.css']
})
export class RegistrationComponentComponent{
  constructor(private router:Router,private service:UserRegistrationService, private auth:AuthGuard) { }
  user:User = new User("","",0,"","");
  message:any;
 
  onRegister(form)
  {
    if(form.valid == true)
    { 
      this.auth.flag = true;
     // this.loginFlag.emit(this.flag);
      this.router.navigate(['/login'],{ skipLocationChange: true });
    }
  }
  registerProcess(form)
  { 
    console.log(form.value);
    let response = this.service.doRegistration(form.value);
    response.subscribe((data) => this.message = data)
  }
}
