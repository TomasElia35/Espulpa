package com.dataespulpa.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "T_Stock")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Stock")
    private Integer idStock;

    @Column(name = "stock_actual")
    private Integer stockActual;

    @Column(name = "stock_critico")
    private Integer stockCritico;

    // Relación inversa: Un Stock pertenece a un Libro
    @OneToOne
    @JoinColumn(name = "id_libro") // Conecta con la FK en la base de datos
    @JsonIgnore // IMPORTANTE: Evita un bucle infinito al generar el JSON
    private Libro libro;
}