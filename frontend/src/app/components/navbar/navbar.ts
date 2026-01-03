import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
// Variable para controlar si el menú está colapsado o no
  isMenuCollapsed = true;

  // Función para alternar el estado
  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
