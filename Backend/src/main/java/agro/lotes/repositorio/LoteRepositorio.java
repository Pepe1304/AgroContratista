package agro.lotes.repositorio;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import agro.lotes.modelo.LoteModelo;

public interface LoteRepositorio extends JpaRepository<LoteModelo, UUID> {

    boolean existsByNombre(String nombreString);
    void deleteAllById(UUID fromString);



}