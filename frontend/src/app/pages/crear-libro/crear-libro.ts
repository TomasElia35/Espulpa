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
// Objeto limpio SIN IDs (para que el backend cree todo nuevo)
  nuevoLibro: Libro = {
    titulo: '',
    fechaPublicacion: new Date().toISOString().split('T')[0],
    autor: { nombre: '', biografia: '' }, // Solo enviamos nombre, el backend busca si existe
    categorias: [],
    precioObj: { precioFinal: 0, precioNeto: 0 },
    stock: { stockActual: 0, stockCritico: 5 },
    detalle: { isbn: '', cantPaginas: 0, formato: 'Tapa Blanda', descripcion: '' },
    imagenes: []
  };

  // Variables auxiliares para el formulario
  categoriasInput: string = ''; // Aquí escribiremos "Novela, Terror"
  imagenPrevisualizacion: string | ArrayBuffer | null = null;
  
  enviando: boolean = false;
  mensajeExito: boolean = false;
  mensajeError: boolean = false;

  constructor(private libroService: LibroService, private router: Router) {}

  // 1. LÓGICA DE IMAGEN (De Archivo a Texto Base64)
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPrevisualizacion = e.target.result;
        // Asignamos la imagen al libro
        this.nuevoLibro.imagenes = [{ urlImagen: e.target.result }];
      };
      reader.readAsDataURL(file); // Esto dispara el onload
    }
  }

  // 2. GUARDAR LIBRO
  guardarLibro() {
    this.enviando = true;
    this.mensajeError = false;

    // A. Procesar Categorías (De string "A, B" a Array de Objetos)
    if (this.categoriasInput.trim().length > 0) {
      this.nuevoLibro.categorias = this.categoriasInput.split(',').map(catName => ({
        nombre: catName.trim() // El backend buscará si existe "Novela"
      }));
    }

    // B. Enviar al Backend
    this.libroService.crearLibro(this.nuevoLibro).subscribe({
      next: (resp) => {
        this.enviando = false;
        this.mensajeExito = true;
        // Esperar 2 segundos y volver al catálogo
        setTimeout(() => {
          this.router.navigate(['/catalogo']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error al crear:', err);
        this.enviando = false;
        this.mensajeError = true;
      }
    });
  }

  
}
