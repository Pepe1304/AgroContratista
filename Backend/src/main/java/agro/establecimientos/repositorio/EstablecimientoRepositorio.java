package agro.establecimientos.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import agro.establecimientos.modelo.EstablecimientoModelo;
import java.util.UUID;

public interface EstablecimientoRepositorio extends JpaRepository<EstablecimientoModelo, UUID> {
    boolean existsByNombre(String nombre);
}
