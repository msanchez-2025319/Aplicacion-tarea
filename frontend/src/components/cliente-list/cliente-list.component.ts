import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-card">
      <h2>Lista de Clientes</h2>
      <div class="table-responsive">
        <table>
          <thead>
            <tr><th>Código</th><th>Nombre</th><th>Dirección</th><th>Teléfono</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let cliente of clientes">
              <td>{{ cliente.codigo }}</td>
              <td>{{ cliente.nombre }}</td>
              <td>{{ cliente.direccion }}</td>
              <td>{{ cliente.telefono }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div *ngIf="clientes.length === 0" class="empty">No hay clientes registrados</div>
    </div>
  `,
  styles: [`
    .table-card { background: white; border-radius: 8px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h2 { color: #2c3e50; margin-bottom: 20px; font-size: 22px; }
    .table-responsive { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #3498db; color: white; padding: 12px 16px; text-align: left; }
    td { padding: 12px 16px; border-bottom: 1px solid #ecf0f1; }
    tr:hover { background: #f8f9fa; }
    .empty { text-align: center; padding: 40px; color: #7f8c8d; }
  `]
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.obtenerClientes().subscribe({
      next: (data) => { this.clientes = data; },
      error: () => { alert('Error al cargar clientes. Asegúrate de que el backend esté corriendo.'); }
    });
  }

  actualizarLista(): void {
    this.cargarClientes();
  }
}