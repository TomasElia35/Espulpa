package com.dataespulpa.backend.repositories;

import com.dataespulpa.backend.entities.Autor;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AutorRepository extends JpaRepository<Autor, Integer> {
}
