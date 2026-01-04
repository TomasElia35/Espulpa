import { Component } from '@angular/core';
import { Libro } from '../../models/libro.models';
import { LibroService } from '../../services/libro.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-libro',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-libro.html',
  styleUrl: './crear-libro.scss',
})
export class CrearLibro {
// Inicializamos el objeto completo para evitar errores de "undefined"
nuevoLibro: Libro = {
    // id: 0, <--- ¡ELIMINA ESTA LÍNEA! (Al no enviarlo, Spring crea uno nuevo)
    
    titulo: '',
    fechaPublicacion: new Date().toISOString().split('T')[0],
    
    // Autor sin ID (se creará uno nuevo o el backend lo manejará)
    autor: { nombre: '', biografia: '' }, 
    
    categorias: [],
    
    // Precio sin ID
    precioObj: { precioFinal: 0, precioNeto: 0 }, 
    
    // Stock sin ID
    stock: { stockActual: 0, stockCritico: 5 }, 
    
    // Detalle sin ID
    detalle: { isbn: '', cantPaginas: 0, formato: 'Tapa Blanda', descripcion: '' },
    
    imagenes: []
  };

  // Variable temporal para la URL de la imagen
  imagenUrlInput: string = '';

  enviando: boolean = false;
  mensajeExito: boolean = false;

  constructor(private libroService: LibroService, private router: Router) {}

  guardarLibro() {
    this.enviando = true;

    // 1. Agregamos la imagen al array si el usuario puso una URL
    if (this.imagenUrlInput.trim().length > 0) {
      this.nuevoLibro.imagenes = [{ idImagen: 0, urlImagen: this.imagenUrlInput }];
    }

    // 2. Llamamos al servicio (Nota: Crear suele ser POST, no PUT)
    this.libroService.crearLibro(this.nuevoLibro).subscribe({
      next: (resp) => {
        this.enviando = false;
        this.mensajeExito = true;
        // Redirigir al catálogo después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/catalogo']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error al crear:', err);
        this.enviando = false;
        alert('Hubo un error al crear el libro. Revisa la consola.');
      }
    });
}
}
