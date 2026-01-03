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
  this.route.paramMap.subscribe(params => {
    const id = Number(params.get('id'));
    
    // Verificamos que sea un número válido
    if (id && !isNaN(id)) {
      this.obtenerDetalle(id);
    } else {
      // SI NO HAY ID, apagamos el loading y mostramos error o redirigimos
      console.error('ID de libro no válido');
      this.loading = false; 
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
