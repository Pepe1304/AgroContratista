package agro.personas.modelo;
import java.util.UUID;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*Representan las entidades o estructuras de datos de la aplicacion.Representa una  Tabla en la Base de Datos = Entidad*/

@Entity(name = "agricultor")/* indica que esta clase es una entidad JPA y se debe mapear a una tabla en la base de datos.*/
@NoArgsConstructor/*Genera un constructor sin argumentos. */
@AllArgsConstructor/*Genera un constructor que incluye todos los campos de la clase. */
@Data/* Genera automáticamente los métodos toString, equals, hashCode, y métodos getters/setters para todos los campos. */


public class PersonaModelo {
    @Id/* Indica que el campo id es la clave primaria de la entidad. */
    @GeneratedValue/* Indica que Id se generará automáticamente */
    
    private UUID id;
    private String razonSocial;
    private String direccion;
    private String telefono;
    private String mail;
    private String lugar;
    private String condFrenteIva;
    private String documento;

    
}
