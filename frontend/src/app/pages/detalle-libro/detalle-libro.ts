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

  // Método para el botón de WhatsApp
  comprarPorWhatsapp() {
    if (!this.libro) return;

    // 1. TU NÚMERO DE TELÉFONO (Pon el real de la editorial)
    // Formato internacional: 549 + código de área + número (sin el 15 si es celular)
    const numeroTelefono = '5492236688916'; 

    // 2. EL MENSAJE AUTOMÁTICO
    const mensaje = `Hola Editorial Espulpa, estoy interesado en comprar el libro "${this.libro.titulo}" de ${this.libro.autor?.nombre || 'el autor'}. ¿Tienen stock disponible?`;

    // 3. CREAR LA URL (encodeURIComponent convierte espacios en %20, etc.)
    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;

    // 4. ABRIR EN NUEVA PESTAÑA
    window.open(url, '_blank');
  }
}