package com.dataespulpa.backend.services;

import com.dataespulpa.backend.entities.Autor;
import com.dataespulpa.backend.entities.InfoContacto;
import com.dataespulpa.backend.repositories.AutorRepository;
import com.dataespulpa.backend.repositories.InfoContactoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InfoContactoService {
    @Autowired
    private InfoContactoRepository infoContactoRepository;

    public List<InfoContacto> obtenerTodas(){
        return infoContactoRepository.findAll();
    }

    public Optional<InfoContacto> obtenerPorId(Integer id){
        return infoContactoRepository.findById(id);
    }

    public InfoContacto guardar(InfoContacto infoContacto){
        return infoContactoRepository.save(infoContacto);
    }

    public void eliminar(Integer id){
        infoContactoRepository.deleteById(id);
    }
}
