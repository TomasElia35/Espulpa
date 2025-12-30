import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro.models';

@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-libro.html',
  styleUrl: './detalle-libro.css'
})
export class DetalleLibro implements OnInit {
  libro: Libro | null = null;
  imagenSeleccionada: string = '';

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerLibro(+id);
    }
  }

  obtenerLibro(id: number): void {
    this.libroService.obtenerLibro(id).subscribe({
      next: (data) => {
        this.libro = data;
        // Establecer imagen inicial
        if (data.imagenes && data.imagenes.length > 0) {
          this.imagenSeleccionada = data.imagenes[0].urlImagen;
        }
      },
      error: (err) => console.error('Error al obtener libro', err)
    });
  }

  cambiarImagen(url: string): void {
    this.imagenSeleccionada = url;
  }
}