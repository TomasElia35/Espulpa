export interface Autor {
  id: number;
  nombre: string;
  biografia: string;
}

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Precio {
  idPrecio: number;
  precioFinal: number;
}

export interface Imagen {
    idImagen: number;
    urlImagen: string;
}

export interface Libro {
  id: number;
  titulo: string;
  fechaPublicacion: string;
  autor: Autor;
  categorias: Categoria[];
  precioObj?: Precio; 
  detalle?: any;
  stock?: any;
  imagenes?: Imagen[];
}

export interface InfoContacto{
  id?: number;
  nombre: string;
  email: string;
  celular: string;
  mensaje: string;
  fecha?: string;
}