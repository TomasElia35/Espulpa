import { Component } from '@angular/core';
import { InfoContacto } from '../../models/libro.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule, CommonModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
})
export class Contacto {
// Modelo inicial vacío
  formulario: InfoContacto = {
    nombre: '',
    email: '',
    celular: '',
    mensaje: ''
  };

  enviando: boolean = false;
  mensajeExito: boolean = false;
  mensajeError: boolean = false;

  constructor(private contactoService: ContactoService) {}

  onSubmit() {
    if (this.valido()) {
      this.enviando = true;
      this.mensajeError = false;

      this.contactoService.enviarMensaje(this.formulario).subscribe({
        next: (resp) => {
          this.enviando = false;
          this.mensajeExito = true;
          // Limpiamos el formulario
          this.formulario = { nombre: '', email: '', celular: '', mensaje: '' };
        },
        error: (err) => {
          console.error('Error al enviar', err);
          this.enviando = false;
          this.mensajeError = true;
        }
      });
    }
  }

  // Validación básica manual
  valido(): boolean {
    return this.formulario.nombre.length > 0 && 
           this.formulario.email.includes('@') && 
           this.formulario.mensaje.length > 0;
  }
}
