package agro.personas.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import agro.personas.modelo.PersonaModelo;
import java.util.UUID;

public interface PersonaRepositorio extends JpaRepository<PersonaModelo, UUID> {
    boolean existsByDocumento(String documento);


}
