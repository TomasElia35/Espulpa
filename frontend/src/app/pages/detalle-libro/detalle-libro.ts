import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <--- 1. IMPORTAR ESTO
import { Libro } from '../../models/libro.models';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-libro.html',
  styleUrl: './detalle-libro.scss',
})
export class DetalleLibro implements OnInit {

  libro: Libro | null = null;
  loading: boolean = true;
  errorCarga: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService,
    private cdr: ChangeDetectorRef // <--- 2. INYECTAR AQUÍ
  ) {}

  ngOnInit(): void {
    console.log('>>> 1. INICIANDO DETALLE-LIBRO');
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id && !isNaN(id)) {
        this.obtenerDetalle(id);
      } else {
        this.loading = false;
        this.errorCarga = true;
      }
    });
  }

  obtenerDetalle(id: number): void {
    this.loading = true; // Reiniciamos loading al cambiar de libro
    
    this.libroService.obtenerLibro(id).subscribe({
      next: (data) => {
        console.log('>>> DATOS RECIBIDOS. Actualizando vista...');
        this.libro = data;
        this.loading = false;

        // <--- 3. LA SOLUCIÓN MÁGICA: FORZAR DETECCIÓN DE CAMBIOS
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('>>> Error:', err);
        this.loading = false;
        this.errorCarga = true;
        this.cdr.detectChanges(); // También forzamos aquí por si acaso
      }
    });
  }
}