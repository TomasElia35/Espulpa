package com.dataespulpa.backend.controllers;

import com.dataespulpa.backend.entities.Categoria;
import com.dataespulpa.backend.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;
    @GetMapping
    public List<Categoria> listarTodas(){
        return categoriaService.obtenerTodas();
    }
    @GetMapping("/{id}")
    public Optional<Categoria> obtenerUna(@PathVariable Integer id){
        return categoriaService.obtenerPorId(id);
    }

    @PostMapping
    public Categoria crear(@RequestBody Categoria categoria){
        return categoriaService.guardar(categoria);
    }

    @PutMapping("/{id}")
    public Categoria actualizar (@PathVariable Integer id, @RequestBody Categoria categoria){
        categoria.setId(id);
        return categoriaService.guardar(categoria);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id){
        categoriaService.eliminar(id);
    }
}
