package agro.lotes.modelo;

import java.util.List;
import java.util.UUID;
import agro.establecimientos.modelo.EstablecimientoModelo;
import agro.parcelas.modelo.ParcelaModelo;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "lotes")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoteModelo {

     @Id
     @GeneratedValue
     private UUID id;
     private String nombre;
     private String coordenadas;
     private String superficie;

     @ManyToOne
     @JoinColumn(name = "id_establecimiento")
     private EstablecimientoModelo establecimiento;

     @OneToMany(mappedBy = "lote")
     private List<ParcelaModelo> parcelas;
}