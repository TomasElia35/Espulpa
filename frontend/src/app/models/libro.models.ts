export interface Autor {
  id?: number; // <--- Opcional
  nombre: string;
  biografia: string;
}

export interface Categoria {
  id?: number; // <--- Opcional
  nombre: string;
}

export interface Precio {
  idPrecio?: number; // <--- Opcional
  precioNeto: number;
  precioFinal: number;
}

export interface Stock {
  idStock?: number; // <--- Opcional
  stockActual: number;
  stockCritico: number;
}

export interface DetalleLibro {
  idLibro?: number; // <--- Opcional
  isbn: string;
  cantPaginas: number;
  formato: string;
  descripcion: string;
}

export interface Imagen {
  idImagen?: number; // <--- Opcional
  urlImagen: string;
}

export interface Libro {
  id?: number; // <--- Opcional (Esto soluciona tu error 500)
  titulo: string;
  fechaPublicacion: string;
  
  autor?: Autor;
  categorias?: Categoria[];
  
  precioObj?: Precio; 
  detalle?: DetalleLibro;
  stock?: Stock;
  
  imagenes?: Imagen[];
}

export interface InfoContacto {
  id?: number;
  nombre: string;
  email: string;
  celular: string;
  mensaje: string;
  fecha?: string;
}