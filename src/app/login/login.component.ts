import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const datos = { usuario: this.usuario, password: this.password };

    this.http.post('http://localhost:5000/login', datos).subscribe(
      (response: any) => {
        console.log(response.message);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error:', error.error.message);
        alert('Usuario o contraseña incorrectos');
      }
    );
  }
}
