import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Catalogo } from './pages/catalogo/catalogo';
import { DetalleLibro } from './pages/detalle-libro/detalle-libro';
import { Contacto } from './pages/contacto/contacto';
import { CrearLibro } from './pages/crear-libro/crear-libro';

export const routes: Routes = [
  // Cuando la ruta es vacía (la raíz), muestra el Home
  { path: '', component: Home },

  { path: 'nosotros', component: About },
  { path: 'catalogo', component: Catalogo },
  { path: 'libro/:id', component: DetalleLibro },
  { path: 'contacto', component: Contacto },
  { path: 'crear', component: CrearLibro },

  
  // Opcional: Redirigir cualquier ruta desconocida al Home
  { path: '**', redirectTo: '' }
];
