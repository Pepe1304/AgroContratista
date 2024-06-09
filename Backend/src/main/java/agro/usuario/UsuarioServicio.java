
package agro.usuario;

import org.springframework.stereotype.Service;
import agro.envioCorreo.CorreoServicio;
import agro.usuario.modelo.UsuarioModelo;
import agro.usuario.repositorio.UsuarioRepositorio;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

/*Usuarios contienen la lógica de negocio de la aplicación.Logica de negocio @Usuarios*/
@Service /* es una anotación de Spring que marca una clase como un servicio */
@RequiredArgsConstructor /*es parte de la biblioteca Lombok y se utiliza para generar automáticamente un constructor con todos los campos marcados como final por la anotación final*/

public class UsuarioServicio {

  private final UsuarioRepositorio usuarioRepositorio;
  private final CorreoServicio correoServicio;

  /* Método para guardar un usuario */
  public void guardarUsuario(UsuarioModelo usuarioNuevo) {

    String emailString = usuarioNuevo.getMail();
    if (usuarioRepositorio.existsByMail(emailString) == false) {
      // Guardar el usuario en el repositorio
      usuarioRepositorio.save(usuarioNuevo);
    }

  }

  public boolean verificarUsuario(String email, String password) {

    UsuarioModelo usuario = usuarioRepositorio.findByMail(email);
    if (usuario != null && usuario.getPassword().equals(password)) {
      return true;
    } else {
      return false;
    }
  }

  public boolean verificarCodigoCorreo(String email) throws MessagingException {

    UsuarioModelo usuario = usuarioRepositorio.findByMail(email);
    Integer codigo = (int) (100000 * Math.random());
    if (usuario != null) {

      correoServicio.enviarCorreo(usuario.getMail(), "Recuperacion de Correo",
          "Utilice este codigo de Recuperacion para crear una nueva contraseña: " + codigo);
      usuario.setCodigoSeguridad(codigo);
      usuarioRepositorio.save(usuario);
      return true;
    } else {
      return false;
    }
  }

  public boolean verificarToken(String email, String codigo) {

    UsuarioModelo usuario = usuarioRepositorio.findByMail(email);

    if (usuario != null && usuario.getCodigoSeguridad() == Integer.parseInt(codigo)) {
      usuario.setCodigoSeguridad(null);
      usuarioRepositorio.save(usuario);
      return true;
    } else {
      return false;
    }
  }

  public boolean generarPassword(String email, String password) {

    UsuarioModelo usuario = usuarioRepositorio.findByMail(email);

    if (usuario != null) {
      usuario.setPassword(password);
      usuarioRepositorio.save(usuario);
      return true;
    } else {
      return false;
    }
  }

}
