import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro.models';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo {
  libros: Libro[] = [];
  loading: boolean = true;
  busqueda: string = '';

constructor(
    private libroService: LibroService,
    private cd: ChangeDetectorRef // 2. Inyectar
  ) {}
  ngOnInit(): void {
    this.cargarLibros();
  }

cargarLibros(): void {
    this.loading = true;
    this.libroService.listarLibros().subscribe({
      next: (data) => {
        this.libros = data;
        this.loading = false;
        this.cd.detectChanges(); // 3. Forzar actualización de la vista
      },
      error: (err) => {
        console.error('Error al cargar libros', err);
        this.loading = false;
        this.cd.detectChanges(); // También en error por si acaso
      }
    });
  }

  buscar(): void {
    if (this.busqueda.trim() === '') {
      this.cargarLibros();
      return;
    }

    this.loading = true;
    this.libroService.buscarLibro(this.busqueda).subscribe({
      next: (data) => {
        this.libros = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error en búsqueda', err);
        this.loading = false;
      }
    });
  }}

