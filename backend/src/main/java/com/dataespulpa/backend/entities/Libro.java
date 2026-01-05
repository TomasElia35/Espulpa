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
// Las relaciones 1 a 1 deben tener cascade = ALL y orphanRemoval = true (opcional pero recomendado)
    @OneToOne(mappedBy = "libro", cascade = CascadeType.ALL, orphanRemoval = true)
    private Precio precioObj;

    @OneToOne(mappedBy = "libro", cascade = CascadeType.ALL, orphanRemoval = true)
    private Stock stock;

    @OneToOne(mappedBy = "libro", cascade = CascadeType.ALL, orphanRemoval = true)
    private DetalleLibro detalle;

    @OneToMany(mappedBy = "libro", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Imagen> imagenes;
}