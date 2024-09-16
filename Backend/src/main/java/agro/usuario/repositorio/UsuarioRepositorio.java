package agro.usuario.repositorio;
/*Los repositorios se encargan de la interaccion con la capa de persistencia de datos (generalmente bases de datos)*/

import org.springframework.data.jpa.repository.JpaRepository;

import agro.usuario.modelo.UsuarioModelo;

import java.util.UUID;

public interface UsuarioRepositorio extends JpaRepository<UsuarioModelo,UUID> {
   
    UsuarioModelo findByMail(String mail);
    boolean existsByMail(String mail);
   
} 

