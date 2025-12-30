package com.dataespulpa.backend.controllers;

import com.dataespulpa.backend.entities.Autor;
import com.dataespulpa.backend.entities.InfoContacto;
import com.dataespulpa.backend.services.AutorService;
import com.dataespulpa.backend.services.InfoContactoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/infoContact")
@CrossOrigin(origins = "*")
public class InfoContactoController {
    @Autowired
    private InfoContactoService infoContactoService;
    @GetMapping
    public List<InfoContacto> listarTodas(){
        return infoContactoService.obtenerTodas();
    }
    @GetMapping("/{id}")
    public Optional<InfoContacto> obtenerUna(@PathVariable Integer id){
        return infoContactoService.obtenerPorId(id);
    }

    @PostMapping
    public InfoContacto crear(@RequestBody InfoContacto infoContacto){
        return infoContactoService.guardar(infoContacto);
    }

    @PutMapping("/{id}")
    public InfoContacto actualizar (@PathVariable Integer id, @RequestBody InfoContacto infoContacto){
        infoContacto.setIdInfo(id);
        return infoContactoService.guardar(infoContacto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id){
        infoContactoService.eliminar(id);
    }
}
