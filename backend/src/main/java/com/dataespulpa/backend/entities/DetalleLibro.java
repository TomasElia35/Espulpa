package com.dataespulpa.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "T_DetalleLibro")
public class DetalleLibro {

    @Id
    @Column(name = "Id_Libro") // La PK es el id del libro
    private Integer idLibro;

    private String isbn;

    @Column(name = "cant_paginas")
    private Integer cantPaginas;

    private String formato;

    private String descripcion;

    @OneToOne
    @MapsId // Esto le dice a Java: "Mi ID es el mismo que el del Libro"
    @JoinColumn(name = "id_libro")
    @JsonIgnore
    private Libro libro;
}