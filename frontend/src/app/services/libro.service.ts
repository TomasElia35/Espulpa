import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Libro {
  private apiUrl = 'http://localhost:8080/api/libros';

  constructor(private http: HttpClient) { }

  // Listar
  listarLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  // Obtener uno solo (Para cargar el formulario de edición)
  obtenerLibro(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  // Crear
  crearLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  // Actualizar (Envía el objeto completo con sus hijos)
  actualizarLibro(id: number, libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro);
  }

  // Eliminar
  eliminarLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Buscar
  buscarLibro(texto: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/buscar?texto=${texto}`);
  }
}
