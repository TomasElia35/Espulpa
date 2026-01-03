package com.dataespulpa.backend.controllers;

import com.dataespulpa.backend.entities.Autor;
import com.dataespulpa.backend.entities.Libro;
import com.dataespulpa.backend.services.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "http://localhost:4200")
public class LibroController {

    @Autowired
    private LibroService libroService;

    @GetMapping
    public List<Libro> listarTodos() {
        return libroService.obtenerTodos();
    }

    @GetMapping("/buscar")
    public List<Libro> buscar(@RequestParam String texto ){
        return libroService.buscarPorTitulo(texto);
    }

    @PostMapping
    public Libro crear(@RequestBody Libro libro) {
        return libroService.guardar(libro);
    }

    // ACTUALIZAR (PUT)
    // Recibe el libro completo con stock, precio, etc. modificados
    @PutMapping("/{id}")
    public Libro actualizar(@PathVariable Integer id, @RequestBody Libro libro) {
        libro.setId(id); // Aseguramos que el ID sea el correcto
        return libroService.guardar(libro);
    }

    // Puedes agregar los métodos PUT y DELETE aquí copiando los de AutorController

    @GetMapping("/{id}")
    public Optional<Libro> obtenerUna(@PathVariable Integer id){
        return libroService.obtenerPorId(id);
    }


    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id){
        libroService.eliminar(id);
    }
}
