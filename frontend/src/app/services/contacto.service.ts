import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoContacto } from '../models/libro.models'; // Usamos la interfaz que ya tienes

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  
  // Asegúrate de que esta URL coincida con tu Controller en Java
  private apiUrl = 'http://localhost:8080/api/infoContact';

  constructor(private http: HttpClient) { }

  // Método para guardar el mensaje (POST)
  enviarMensaje(formulario: InfoContacto): Observable<InfoContacto> {
    return this.http.post<InfoContacto>(this.apiUrl, formulario);
  }
}