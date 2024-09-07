package agro.parcelas.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import agro.parcelas.modelo.ParcelaModelo;
import java.util.UUID;

public interface ParcelasRepositorio extends JpaRepository<ParcelaModelo, UUID> {
    boolean existsByNombre(String nombre);

}
