package com.dataespulpa.backend.services;

import com.dataespulpa.backend.entities.Autor;
import com.dataespulpa.backend.entities.Categoria;
import com.dataespulpa.backend.repositories.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AutorService {
    @Autowired
    private AutorRepository autorRepository;

    public List<Autor> obtenerTodas(){
        return autorRepository.findAll();
    }

    public Optional<Autor> obtenerPorId(Integer id){
        return autorRepository.findById(id);
    }

    public Autor guardar(Autor autor){
        return autorRepository.save(autor);
    }

    public void eliminar(Integer id){
        autorRepository.deleteById(id);
    }
}
