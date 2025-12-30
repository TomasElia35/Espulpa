--CREATE DATABASE DATAESPULPA

-- 1. Tabla de Autores (Debe crearse antes que Libros)
CREATE TABLE T_Autores (
    Id_Autor INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    Biografia NVARCHAR(MAX) NULL -- Puede ser nulo si aun no tenemos la info
);
GO

-- 2. Tabla de Categorias
CREATE TABLE T_Categorias (
    Id_Categoria INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(50) NOT NULL UNIQUE -- UNIQUE para no repetir categorias
);
GO

-- 3. Tabla Principal de Libros
CREATE TABLE T_Libros (
    Id_Libro INT PRIMARY KEY IDENTITY(1,1),
    Titulo NVARCHAR(200) NOT NULL,
    Fecha_Publicacion DATE NULL,
    Id_Autor INT NOT NULL,
    
    -- Relación: Un libro debe tener un autor
    CONSTRAINT FK_Libros_Autores FOREIGN KEY (Id_Autor) 
    REFERENCES T_Autores(Id_Autor)
);
GO

-- 4. Tabla de Detalles del Libro (Relación 1 a 1 con Libros)
-- Separamos la info pesada o técnica
CREATE TABLE T_DetalleLibro (
    Id_Libro INT PRIMARY KEY, -- La PK es tambien FK para asegurar relación 1 a 1
    ISBN VARCHAR(20) UNIQUE NULL,
    Cant_Paginas INT NULL,
    Formato NVARCHAR(50) NULL, -- Ej: Tapa dura, Digital, Bolsillo
    Descripcion NVARCHAR(MAX) NULL,

    CONSTRAINT FK_Detalle_Libros FOREIGN KEY (Id_Libro)
    REFERENCES T_Libros(Id_Libro) ON DELETE CASCADE 
    -- ON DELETE CASCADE: Si borras el libro, se borra su detalle automáticamente
);
GO

-- 5. Tabla Intermedia: Libros por Categoría (Relación Muchos a Muchos)
CREATE TABLE T_Libro_Categoria (
    Id_Libro INT NOT NULL,
    Id_Categoria INT NOT NULL,

    -- Clave Primaria Compuesta (Evita duplicados del mismo par)
    PRIMARY KEY (Id_Libro, Id_Categoria),

    CONSTRAINT FK_LibroCat_Libro FOREIGN KEY (Id_Libro) 
    REFERENCES T_Libros(Id_Libro) ON DELETE CASCADE,
    
    CONSTRAINT FK_LibroCat_Categoria FOREIGN KEY (Id_Categoria) 
    REFERENCES T_Categorias(Id_Categoria)
);
GO

-- 6. Tabla de Precios
CREATE TABLE T_Precios (
    Id_Precio INT PRIMARY KEY IDENTITY(1,1),
    Id_Libro INT NOT NULL,
    Precio_Neto DECIMAL(10, 2) NOT NULL, -- DECIMAL es mejor para dinero
    Precio_Final DECIMAL(10, 2) NOT NULL,
    Fecha_Actualizacion DATETIME DEFAULT GETDATE(), -- Guarda cuando cambió el precio

    CONSTRAINT FK_Precios_Libros FOREIGN KEY (Id_Libro)
    REFERENCES T_Libros(Id_Libro)
);
GO

-- 7. Tabla de Stock
CREATE TABLE T_Stock (
    Id_Stock INT PRIMARY KEY IDENTITY(1,1),
    Id_Libro INT NOT NULL UNIQUE, -- UNIQUE para asegurar un solo registro de stock por libro
    Stock_Actual INT NOT NULL DEFAULT 0,
    Stock_Critico INT NOT NULL DEFAULT 5, -- Avisar cuando queden 5 o menos

    CONSTRAINT FK_Stock_Libros FOREIGN KEY (Id_Libro)
    REFERENCES T_Libros(Id_Libro)
);
GO

-- 8. Tabla para el Formulario de Contacto
CREATE TABLE T_InfoContactoCliente (
    Id_Info INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Celular VARCHAR(20) NULL,
    Mensaje NVARCHAR(MAX) NOT NULL,
    Fecha_Recepcion DATETIME DEFAULT GETDATE() -- Se guarda la hora autom.
);
GO