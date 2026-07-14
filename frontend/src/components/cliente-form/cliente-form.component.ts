import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-card">
      <h2>Agregar Cliente</h2>
      <form #form="ngForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Nombre *</label>
          <input type="text" name="nombre" [(ngModel)]="cliente.nombre" required #nombre="ngModel" placeholder="Ingrese el nombre" />
          <div class="error" *ngIf="nombre.invalid && nombre.touched">El nombre es obligatorio</div>
        </div>
        <div class="form-group">
          <label>Dirección *</label>
          <input type="text" name="direccion" [(ngModel)]="cliente.direccion" required #direccion="ngModel" placeholder="Ingrese la dirección" />
          <div class="error" *ngIf="direccion.invalid && direccion.touched">La dirección es obligatoria</div>
        </div>
        <div class="form-group">
          <label>Teléfono *</label>
          <input type="text" name="telefono" [(ngModel)]="cliente.telefono" required #telefono="ngModel" placeholder="Ingrese el teléfono" />
          <div class="error" *ngIf="telefono.invalid && telefono.touched">El teléfono es obligatorio</div>
        </div>
        <div class="button-group">
          <button type="submit" [disabled]="form.invalid" class="btn-primary">Agregar Cliente</button>
          <button type="button" (click)="limpiar()" class="btn-secondary">Limpiar</button>
        </div>
        <div class="success" *ngIf="mensajeExito">{{ mensajeExito }}</div>
        <div class="error-message" *ngIf="mensajeError">{{ mensajeError }}</div>
      </form>
    </div>
  `,
  styles: [`
    .form-card { background: white; border-radius: 8px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 24px; }
    h2 { color: #2c3e50; margin-bottom: 20px; font-size: 22px; }
    .form-group { margin-bottom: 16px; }
    label { display: block; margin-bottom: 6px; color: #2c3e50; font-weight: 500; }
    input { width: 100%; padding: 10px 12px; border: 1px solid #dce1e8; border-radius: 4px; font-size: 14px; transition: border-color 0.3s; }
    input:focus { outline: none; border-color: #3498db; }
    input.ng-invalid.ng-touched { border-color: #e74c3c; }
    .error { color: #e74c3c; font-size: 12px; margin-top: 4px; }
    .button-group { display: flex; gap: 10px; margin-top: 20px; }
    .btn-primary { flex: 1; background: #27ae60; color: white; padding: 10px 20px; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; transition: background 0.3s; }
    .btn-primary:hover:not(:disabled) { background: #229954; }
    .btn-primary:disabled { background: #95a5a6; cursor: not-allowed; }
    .btn-secondary { background: #95a5a6; color: white; padding: 10px 20px; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; transition: background 0.3s; }
    .btn-secondary:hover { background: #7f8c8d; }
    .success { color: #27ae60; margin-top: 12px; padding: 10px; background: #d5f5e3; border-radius: 4px; }
    .error-message { color: #e74c3c; margin-top: 12px; padding: 10px; background: #fadbd8; border-radius: 4px; }
  `]
})
export class ClienteFormComponent {
  @Output() clienteAgregado = new EventEmitter<void>();
  cliente = { nombre: '', direccion: '', telefono: '' };
  mensajeExito = '';
  mensajeError = '';

  constructor(private clienteService: ClienteService) {}

  onSubmit(): void {
    if (this.cliente.nombre && this.cliente.direccion && this.cliente.telefono) {
      this.clienteService.agregarCliente(this.cliente).subscribe({
        next: () => {
          this.mensajeExito = '¡Cliente agregado correctamente!';
          this.mensajeError = '';
          this.limpiar();
          this.clienteAgregado.emit();
          setTimeout(() => this.mensajeExito = '', 3000);
        },
        error: () => {
          this.mensajeError = 'Error al agregar cliente. Verifica el backend.';
          this.mensajeExito = '';
        }
      });
    }
  }

  limpiar(): void {
    this.cliente = { nombre: '', direccion: '', telefono: '' };
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}