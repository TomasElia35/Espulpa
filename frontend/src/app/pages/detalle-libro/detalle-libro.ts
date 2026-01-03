import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libro.models';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-libro',
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-libro.html',
  styleUrl: './detalle-libro.scss',
})
export class DetalleLibro implements OnInit {

  libro: Libro | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService
  ) {}

  ngOnInit(): void {
    // Escuchamos el ID de la URL
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.obtenerDetalle(id);
      }
    });
  }

  obtenerDetalle(id: number): void {
    this.loading = true;
    this.libroService.obtenerLibro(id).subscribe({
      next: (data) => {
        this.libro = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener libro', err);
        this.loading = false;
      }
    });
  }
}
