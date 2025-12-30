package com.dataespulpa.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "T_Categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Categoria")
    private Integer id;

    @Column(name = "Nombre")
    private String nombre;

}
