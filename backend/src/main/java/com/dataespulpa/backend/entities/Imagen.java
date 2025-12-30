package com.dataespulpa.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "T_Imagenes")
public class Imagen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Imagen")
    private Integer idImagen;

    @Column(name = "Url_Imagen")
    private String urlImagen;

    // Relación de vuelta al libro
    @ManyToOne
    @JoinColumn(name = "Id_Libro") // FK en la tabla T_Imagenes
    @JsonIgnore
    private Libro libro;
}