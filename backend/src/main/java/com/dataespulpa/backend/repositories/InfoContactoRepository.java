package com.dataespulpa.backend.repositories;

import com.dataespulpa.backend.entities.InfoContacto;
import com.dataespulpa.backend.entities.Libro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfoContactoRepository extends JpaRepository<InfoContacto, Integer> {
}
