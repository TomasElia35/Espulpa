package com.dataespulpa.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "T_Autores")
public class Autor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Autor")
    private Integer id;

    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "Biografia")
    private String biografia;
}
