import { Request, Response } from 'express';
import { ClienteModel, Cliente } from '../models/Clientes';

export class ClienteController {
  private modelo: ClienteModel;

  constructor() {
    this.modelo = new ClienteModel();
  }

  async obtenerTodos(req: Request, res: Response): Promise<void> {
    try {
      const clientes = await this.modelo.obtenerTodos();
      res.status(200).json(clientes);
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      res.status(500).json({ mensaje: 'Error al obtener los clientes' });
    }
  }

  async agregar(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, direccion, telefono } = req.body;
      
      if (!nombre || !direccion || !telefono) {
        res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        return;
      }

      const nuevoCliente = {
        nombre,
        direccion,
        telefono
      };

      const clienteAgregado = await this.modelo.agregar(nuevoCliente);
      res.status(201).json(clienteAgregado);
    } catch (error) {
      console.error('Error en agregar:', error);
      res.status(500).json({ mensaje: 'Error al agregar el cliente' });
    }
  }
}