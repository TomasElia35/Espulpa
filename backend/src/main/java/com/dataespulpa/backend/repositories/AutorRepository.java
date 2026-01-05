package com.dataespulpa.backend.repositories;

import com.dataespulpa.backend.entities.Autor;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AutorRepository extends JpaRepository<Autor, Integer> {

    Optional<Autor> findByNombre(String nombre);

}
