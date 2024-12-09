import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent {
  usuarios: any[] = [];
  filtro: string = '';
  enEdicion: number | null = null;
  usuarioEditado: any = {
    id: '',
    nombre: '',
    apellidos: '',
    correo: '',
    tipo_usuario: '',
    password: '',
    status: '',
    fecha_registro: '',
  };
  nuevoUsuario: any = {
    id: '',
    nombre: '',
    apellidos: '',
    correo: '',
    tipo_usuario: '',
    password: '',
    status: '',
    fecha_registro: '',
  };

  constructor(private http: HttpClient) {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    const params = this.filtro ? { filtro: this.filtro } : undefined;
    this.http.get('http://localhost:5000/usuarios', { params }).subscribe(
      (data: any) => {
        this.usuarios = data;
      },
      (error) => {
        alert(error.error.message || 'Error al cargar usuarios');
      }
    );
  }

  buscarUsuario() {
    this.cargarUsuarios();
  }

  editarUsuario(usuario: any) {
    this.enEdicion = usuario.id;
    this.usuarioEditado = { ...usuario };
  }

  confirmarEdicion() {
    // Convertir fecha_registro al formato adecuado si es necesario
    const fecha = new Date(this.usuarioEditado.fecha_registro);
    this.usuarioEditado.fecha_registro = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    console.log('Datos enviados para actualizar:', this.usuarioEditado); // Verificar datos enviados

    this.http.put(`http://localhost:5000/usuarios/${this.enEdicion}`, this.usuarioEditado).subscribe(
      () => {
        alert('Usuario actualizado correctamente');
        this.enEdicion = null;
        this.cargarUsuarios();
      },
      (error) => {
        console.error('Error al actualizar usuario:', error); // Verifica el error en caso de fallo
        alert('Error al actualizar usuario');
      }
    );
  }

  cancelarEdicion() {
    this.enEdicion = null;
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.http.delete(`http://localhost:5000/usuarios/${id}`).subscribe(
        () => {
          alert('Usuario eliminado correctamente');
          this.cargarUsuarios();
        },
        (error) => {
          alert('Error al eliminar usuario');
        }
      );
    }
  }

  agregarUsuario() {
    if (
      !this.nuevoUsuario.id ||
      !this.nuevoUsuario.nombre ||
      !this.nuevoUsuario.apellidos ||
      !this.nuevoUsuario.correo ||
      !this.nuevoUsuario.tipo_usuario ||
      !this.nuevoUsuario.password ||
      !this.nuevoUsuario.status ||
      !this.nuevoUsuario.fecha_registro
    ) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.http.post('http://localhost:5000/usuarios', this.nuevoUsuario).subscribe(
      () => {
        alert('Usuario agregado correctamente');
        this.nuevoUsuario = {
          id: '',
          nombre: '',
          apellidos: '',
          correo: '',
          tipo_usuario: '',
          password: '',
          status: '',
          fecha_registro: '',
        };
        this.cargarUsuarios();
      },
      (error) => {
        alert('Error al agregar usuario');
      }
    );
  }
}
