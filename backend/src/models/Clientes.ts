import { Database } from '../persistence/Database';

export interface Cliente {
  codigo: number;
  nombre: string;
  direccion: string;
  telefono: string;
}

export class ClienteModel {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  async obtenerTodos(): Promise<Cliente[]> {
    const result = await this.db.query('SELECT * FROM clientes ORDER BY codigo ASC');
    return result.rows;
  }

  async agregar(cliente: Omit<Cliente, 'codigo'>): Promise<Cliente> {
    const query = 'INSERT INTO clientes (nombre, direccion, telefono) VALUES ($1, $2, $3) RETURNING *';
    const values = [cliente.nombre, cliente.direccion, cliente.telefono];
    const result = await this.db.query(query, values);
    return result.rows[0];
  }
}