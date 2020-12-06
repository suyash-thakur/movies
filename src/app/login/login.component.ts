import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isCredCorrect: boolean = true;
  buttonDisabled: boolean = false;
  createForm(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  constructor(private fb: FormBuilder, private authService: AuthenticateService, private http: HttpClient, private router: Router ) {
    this.createForm();
  }

  ngOnInit(): void {
  }
  onSubmit(data): void {
    this.login(data.name, data.password);
  }
  login(name, password): void{
    const Auth = {
      username: name,
      password: password
    };
    this.buttonDisabled = true;
    this.http.post('https://demo.credy.in/api/v1/usermodule/login/', Auth).subscribe( (user:any) => {
      console.log('success', user);
      this.buttonDisabled = false;
      this.authService.saveAuthData(user.data.token, user.data.expiry);
      this.router.navigate(['movies']);

    }, error => {
      this.isCredCorrect = false;
      this.loginForm.reset();
      this.buttonDisabled = false;
    }
    );
  }
}
