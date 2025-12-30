package com.dataespulpa.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "T_Precios")
public class Precio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Precio")
    private Integer idPrecio;

    @Column(name = "precio_neto")
    private BigDecimal precioNeto;

    @Column(name = "precio_final")
    private BigDecimal precioFinal;

    @OneToOne
    @JoinColumn(name = "id_libro")
    @JsonIgnore
    private Libro libro;
}