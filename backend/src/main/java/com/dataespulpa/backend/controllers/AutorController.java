package com.dataespulpa.backend.controllers;

import com.dataespulpa.backend.entities.Autor;
import com.dataespulpa.backend.entities.Categoria;
import com.dataespulpa.backend.services.AutorService;
import com.dataespulpa.backend.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/autores")
@CrossOrigin(origins = "*")
public class AutorController {
    @Autowired
    private AutorService autorService;
    @GetMapping
    public List<Autor> listarTodas(){
        return autorService.obtenerTodas();
    }
    @GetMapping("/{id}")
    public Optional<Autor> obtenerUna(@PathVariable Integer id){
        return autorService.obtenerPorId(id);
    }

    @PostMapping
    public Autor crear(@RequestBody Autor autor){
        return autorService.guardar(autor);
    }

    @PutMapping("/{id}")
    public Autor actualizar (@PathVariable Integer id, @RequestBody Autor autor){
        autor.setId(id);
        return autorService.guardar(autor);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id){
        autorService.eliminar(id);
    }
}
