package com.dataespulpa.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate; // Usamos LocalDate para fechas sin hora (DATE en SQL)
import java.util.List;

@Data
@Entity
@Table(name = "T_Libros")
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Libro")
    private Integer id;

    @Column(name = "Titulo")
    private String titulo;

    @Column(name = "Fecha_Publicacion")
    private LocalDate fechaPublicacion; // LocalDate es mejor para tipos DATE SQL

    // RELACIÓN 1: Autor
    @ManyToOne
    @JoinColumn(name = "Id_Autor") // Correcto (Mayúsculas coinciden con SQL)
    private Autor autor;

    // RELACIÓN 2: Categorías (CORREGIDO)
    @ManyToMany
    @JoinTable(
            name = "T_Libro_Categoria",
            // ¡OJO AQUÍ! Deben ser Id_Libro e Id_Categoria tal cual están en tu script SQL
            joinColumns = @JoinColumn(name = "Id_Libro"),
            inverseJoinColumns = @JoinColumn(name = "Id_Categoria")
    )
    private List<Categoria> categorias;

    // RELACIONES SATÉLITE (1 a 1)

    @OneToOne(mappedBy = "libro", cascade = CascadeType.ALL)
    private Precio precioObj;

    @OneToOne(mappedBy = "libro", cascade = CascadeType.ALL)
    private Stock stock;

    @OneToOne(mappedBy = "libro", cascade = CascadeType.ALL)
    private DetalleLibro detalle;

    // RELACIÓN IMÁGENES (CORREGIDO a Lista)
    // Usamos OneToMany porque la tabla T_Imagenes apunta hacia el libro.
    // Así podrás tener portada y contraportada si quieres.
    @OneToMany(mappedBy = "libro", cascade = CascadeType.ALL)
    private List<Imagen> imagenes;
}