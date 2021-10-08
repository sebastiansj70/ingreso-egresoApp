import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  loginUsuario() {
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) return;


    Swal.fire({
      title: 'Por favor espere',
      didOpen: () => {
        Swal.showLoading()
      }
    })

    const { email, password } = this.loginForm.value

    this.authService.loginUsuario(email, password)
      .then(credenciales => {
        Swal.close()
        console.log(credenciales);
        this.router.navigate(['/']);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      });
  }

}
