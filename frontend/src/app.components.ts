import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClienteFormComponent, ClienteListComponent],
  template: `
    <div class="container">
      <header>
        <h1>Sistema de Gestión de Clientes</h1>
      </header>
      
      <main>
        <app-cliente-form (clienteAgregado)="recargarLista()"></app-cliente-form>
        <app-cliente-list #listaClientes></app-cliente-list>
      </main>
      
      <footer>
        <p>&copy; 2026 - Aplicación de Gestión de Clientes</p>
      </footer>
    </div>
  `,
  styles: [`
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f6fa; }
    .container { min-height: 100vh; display: flex; flex-direction: column; }
    header { background: #2c3e50; color: white; padding: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    header h1 { max-width: 1200px; margin: 0 auto; padding: 0 20px; font-size: 28px; }
    main { flex: 1; max-width: 1200px; margin: 0 auto; padding: 20px; width: 100%; }
    footer { background: #2c3e50; color: white; text-align: center; padding: 15px 0; margin-top: 20px; }
    footer p { max-width: 1200px; margin: 0 auto; padding: 0 20px; font-size: 14px; }
  `]
})
export class AppComponent {
  recargarLista(): void {
    const lista = document.querySelector('app-cliente-list') as any;
    if (lista && lista.actualizarLista) {
      lista.actualizarLista();
    }
  }
}