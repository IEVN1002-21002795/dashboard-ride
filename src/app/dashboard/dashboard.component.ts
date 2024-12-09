import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  totalUsuarios: number = 0;
  usuariosPorTipo: any[] = [];
  registradosHoy: number = 0;
  usuariosStatus: any[] = [];
  gananciaDia: number = 0;
  gananciaMensual: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerDatosDashboard();
  }

  obtenerDatosDashboard(): void {
    this.http.get('http://localhost:5000/dashboard').subscribe(
      (data: any) => {
        // Asignamos los datos obtenidos al componente
        this.totalUsuarios = data.total_usuarios;
        this.usuariosPorTipo = data.usuarios_por_tipo;
        this.registradosHoy = data.registrados_hoy;
        this.usuariosStatus = data.usuarios_status;
        this.gananciaDia = data.ganancia_dia;
        this.gananciaMensual = data.ganancia_mensual;
      },
      (error) => {
        console.error('Error al obtener los datos del dashboard:', error);
      }
    );
  }

  actualizarDatos(): void {
    this.obtenerDatosDashboard(); // Reutilizamos el método existente
  }
}