import { Pool } from 'pg';

export class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'admin',
      database: 'clientesdb'
    });
  }

  async query(text: string, params?: any[]): Promise<any> {
    try {
      const result = await this.pool.query(text, params);
      return result;
    } catch (error) {
      console.error('Error en la consulta:', error);
      throw error;
    }
  }

  async getClient(): Promise<any> {
    return this.pool;
  }
}