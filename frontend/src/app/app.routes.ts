import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Catalogo } from './components/catalogo/catalogo';
import { DetalleLibro } from './components/detalle-libro/detalle-libro';

export const routes: Routes = [
{ path: '', component: Home },
    { path: 'catalogo', component: Catalogo },
    { path: 'libro/:id', component: DetalleLibro }, // Nueva ruta dinámica
    { path: '**', redirectTo: '' }
];
