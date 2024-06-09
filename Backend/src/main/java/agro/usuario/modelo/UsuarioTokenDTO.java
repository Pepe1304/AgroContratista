package agro.usuario.modelo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor /* Genera un constructor sin argumentos. */
@AllArgsConstructor /* Genera un constructor que incluye todos los campos de la clase. */
@Data /* Genera automáticamente los métodos toString, equals, hashCode, y métodosgetters/setters para todos los campos.*/


public class UsuarioTokenDTO {
    private String mail;
    private String codigo;
   
}



