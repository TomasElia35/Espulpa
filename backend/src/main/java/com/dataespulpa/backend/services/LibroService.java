package com.dataespulpa.backend.services;

import com.dataespulpa.backend.entities.*;
import com.dataespulpa.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Importante para la integridad

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LibroService {

    @Autowired
    private LibroRepository libroRepository;
    @Autowired
    private AutorRepository autorRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;

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

    @Transactional // Si algo falla, deshace todos los cambios (Rollback)
    public Libro guardar(Libro libro) {

        // --- 1. GESTIÓN INTELIGENTE DEL AUTOR ---
        if (libro.getAutor() != null) {
            String nombreAutor = libro.getAutor().getNombre();
            if (nombreAutor != null && !nombreAutor.isEmpty()) {
                // Buscamos si ya existe por nombre
                Optional<Autor> autorExistente = autorRepository.findByNombre(nombreAutor);

                if (autorExistente.isPresent()) {
                    // Si existe, usamos SU ID (evitamos duplicados)
                    libro.setAutor(autorExistente.get());
                } else {
                    // Si no existe, guardamos el nuevo autor primero
                    Autor nuevoAutor = autorRepository.save(libro.getAutor());
                    libro.setAutor(nuevoAutor);
                }
            }
        }

        // --- 2. GESTIÓN INTELIGENTE DE CATEGORÍAS ---
        if (libro.getCategorias() != null && !libro.getCategorias().isEmpty()) {
            List<Categoria> categoriasFinales = new ArrayList<>();

            for (Categoria cat : libro.getCategorias()) {
                // Buscamos cada categoría por nombre
                Optional<Categoria> catExistente = categoriaRepository.findByNombre(cat.getNombre());

                if (catExistente.isPresent()) {
                    categoriasFinales.add(catExistente.get());
                } else {
                    // Si no existe, la creamos
                    categoriasFinales.add(categoriaRepository.save(cat));
                }
            }
            libro.setCategorias(categoriasFinales);
        }

        // --- 3. VINCULACIÓN BIDIRECCIONAL (La Clave para que no falle el ID nulo) ---
        // Le decimos a cada "hijo" quién es su "padre" antes de guardar.

        if (libro.getDetalle() != null) {
            libro.getDetalle().setLibro(libro);
        }

        if (libro.getStock() != null) {
            libro.getStock().setLibro(libro);
        }

        if (libro.getPrecioObj() != null) {
            libro.getPrecioObj().setLibro(libro);
        }

        if (libro.getImagenes() != null) {
            for (Imagen img : libro.getImagenes()) {
                img.setLibro(libro);
            }
        }

        // --- 4. GUARDADO FINAL ---
        // Gracias al CascadeType.ALL en Libro.java, esto guardará Precio, Stock, Detalle e Imágenes automáticamente.
        return libroRepository.save(libro);
    }

    public void eliminar(Integer id) {
        libroRepository.deleteById(id);
    }
}