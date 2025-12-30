package com.dataespulpa.backend.services;

import com.dataespulpa.backend.entities.Libro;
import com.dataespulpa.backend.repositories.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LibroService {

    @Autowired
    private LibroRepository libroRepository;

    public List<Libro> obtenerTodos() {
        return libroRepository.findAll();
    }

    public Optional<Libro> obtenerPorId(Integer id) {
        return libroRepository.findById(id);
    }

    // BUSCAR POR TÍTULO
    public List<Libro> buscarPorTitulo(String texto) {
        return libroRepository.findByTituloContainingIgnoreCase(texto);
    }

    // GUARDAR O ACTUALIZAR (El método Maestro)
    public Libro guardar(Libro libro) {
        // EL TRUCO DE RECONEXIÓN:
        // Antes de guardar, le recordamos a los hijos quién es el padre.
        // Si no hacemos esto, a veces JPA intenta crear precios o stocks huérfanos.

        if (libro.getPrecioObj() != null) {
            libro.getPrecioObj().setLibro(libro);
        }

        if (libro.getStock() != null) {
            libro.getStock().setLibro(libro);
        }

        if (libro.getDetalle() != null) {
            libro.getDetalle().setLibro(libro);
        }

        // Si tienes imágenes, también recorremos la lista
        if (libro.getImagenes() != null) {
            libro.getImagenes().forEach(img -> img.setLibro(libro));
        }

        return libroRepository.save(libro);
    }

    public void eliminar(Integer id) {
        libroRepository.deleteById(id);
    }
}