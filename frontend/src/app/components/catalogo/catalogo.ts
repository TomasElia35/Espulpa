import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
// Importamos la clase corregida LibroService
import { LibroService } from '../../services/libro.service'; 
import { Libro } from '../../models/libro.models';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css', // Ojo: styleUrl (singular) en Angular 17+
})
export class Catalogo implements OnInit {
  libros: Libro[] = [];

  // Inyectamos LibroService (NO Libro)
  constructor(private libroService: LibroService) {} 

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.libroService.listarLibros().subscribe({
      next: (data) => {
        this.libros = data;
        console.log('Libros cargados:', this.libros);
      },
      error: (err) => {
        console.error('Error al cargar libros', err);
      }
    });
  }
}