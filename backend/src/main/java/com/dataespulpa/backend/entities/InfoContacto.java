package com.dataespulpa.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "T_InfoContactoCliente")
public class InfoContacto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Info")
    private Integer idInfo;

    @Column(name = "Nombre")
    private String nombre;
    @Column(name = "Email")
    private String email;
    @Column(name = "Celular")
    private String celular;
    @Column(name = "Mensaje")
    private String mensaje;

    @Column(name = "Fecha_Recepcion")
    private LocalDateTime fechaRecepcion = LocalDateTime.now(); // Se llena sola
}