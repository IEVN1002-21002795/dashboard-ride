import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-abc-clientes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './abc.component.html',
  styleUrls: ['./abc.component.css'],
})
export class AbcComponent {
  usuarios: any[] = []; // Lista de clientes
  filtro: string = ''; // Filtro para búsqueda
  enEdicion: number | null = null; // ID del cliente en edición
  usuarioEditado: any = {}; // Modelo del cliente en edición
  nuevoUsuario: any = {
    nombre: '',
    apellidos: '',
    usuario: '',
    password: '',
    rol: '',
  }; // Modelo para nuevo cliente

  constructor(private http: HttpClient) {
    this.cargarUsuarios(); // Cargar la lista de clientes al iniciar
  }

  // Método para cargar clientes (con o sin filtro)
  cargarUsuarios() {
    const params = this.filtro
      ? { filtro: this.filtro }
      : undefined;

    this.http.get('http://localhost:5000/usuarios_admn', { params }).subscribe(
      (data: any) => {
        this.usuarios = data;
      },
      (error) => {
        alert(error.error.message || 'Error al cargar clientes');
      }
    );
  }

  // Método para buscar clientes
  buscarUsuario() {
    this.cargarUsuarios();
  }

  // Método para iniciar la edición de un cliente
  editarUsuario(usuario: any) {
    this.enEdicion = usuario.id; // Guardar el ID del cliente en edición
    this.usuarioEditado = { ...usuario }; // Copiar los datos del cliente para edición
  }

  // Método para confirmar la edición de un cliente
  confirmarEdicion() {
    this.http.put(`http://localhost:5000/usuarios_admn/${this.enEdicion}`, this.usuarioEditado).subscribe(
      () => {
        alert('Cliente actualizado correctamente');
        this.enEdicion = null; // Salir del modo edición
        this.cargarUsuarios(); // Recargar la lista de clientes
      },
      (error) => {
        alert('Error al actualizar cliente');
      }
    );
  }

  // Método para cancelar la edición
  cancelarEdicion() {
    this.enEdicion = null; // Salir del modo edición
  }

  // Método para eliminar un cliente
  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.http.delete(`http://localhost:5000/usuarios_admn/${id}`).subscribe(
        () => {
          alert('Cliente eliminado correctamente');
          this.cargarUsuarios(); // Recargar la lista de clientes
        },
        (error) => {
          alert('Error al eliminar cliente');
        }
      );
    }
  }

  // Método para agregar un nuevo cliente
  agregarUsuario() {
    if (
      !this.nuevoUsuario.nombre ||
      !this.nuevoUsuario.apellidos ||
      !this.nuevoUsuario.usuario ||
      !this.nuevoUsuario.password ||
      !this.nuevoUsuario.rol
    ) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.http.post('http://localhost:5000/usuarios_admn', this.nuevoUsuario).subscribe(
      () => {
        alert('Cliente agregado correctamente');
        this.nuevoUsuario = {
          nombre: '',
          apellidos: '',
          usuario: '',
          password: '',
          rol: '',
        }; // Limpiar el formulario
        this.cargarUsuarios(); // Recargar la lista de clientes
      },
      (error) => {
        alert('Error al agregar cliente');
      }
    );
  }
}
