package agro.usuario.controlador;

import org.springframework.web.bind.annotation.RestController;
import agro.usuario.UsuarioServicio;
import agro.usuario.modelo.UsuarioGenerarPasswordDTO;
import agro.usuario.modelo.UsuarioLoginDTO;
import agro.usuario.modelo.UsuarioModelo;
import agro.usuario.modelo.UsuarioRecuperarDTO;
import agro.usuario.modelo.UsuarioTokenDTO;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController/* los métodos dentro de ella manejarán solicitudes HTTP y devolverán respuestas HTTP directamente (sin necesidad de una vista).* */
@RequestMapping("/api/usuarios")/**@RequestMapping("/api/usuarios"): Especifica la ruta base para todas las solicitudes manejadas por este controlador.
 En este caso, todas las rutas empezarán con "/api/usuarios". */
@RequiredArgsConstructor/*genera un constructor con todos los campos marcados como final. */
@CrossOrigin(origins = "*")

public class UsuarioControlador {
    private final UsuarioServicio usuarioServicio;/*Esta variable se inicializa a través del constructor (gracias a @RequiredArgsConstructor), l */
   
    @PostMapping
    
    public void guardarUsuarios(@RequestBody UsuarioModelo usuariosNuevo) {/*@RequestBody: Indica que el parámetro usuarioNuevo se debe vincular al cuerpo de la solicitud HTTP. */
        try {
            usuarioServicio.guardarUsuario(usuariosNuevo);

        } catch (Exception e) {
        }
    }

    @PostMapping("verificar-login")
    public boolean verificarLogin(@RequestBody UsuarioLoginDTO usuarioLoginDTO){
       return usuarioServicio.verificarUsuario(usuarioLoginDTO.getMail(), usuarioLoginDTO.getPassword()); //   
       
    }
    
    @PostMapping("recuperar-password")
    public boolean recuperarPassword(@RequestBody UsuarioRecuperarDTO usuarioRecuperarDTO ) throws MessagingException{
       return usuarioServicio.verificarCodigoCorreo(usuarioRecuperarDTO.getMail());  
       
    }

    @PostMapping("verificar-token")
    public boolean verificarToken(@RequestBody UsuarioTokenDTO usuarioTokenDTO ) throws MessagingException{
       return usuarioServicio.verificarToken(usuarioTokenDTO.getMail(),usuarioTokenDTO.getCodigo());  
       
    }

    @PostMapping("generar-password")
    public boolean generarPassword (@RequestBody UsuarioGenerarPasswordDTO usuarioGenerarPasswordDTO ) throws MessagingException{
       return usuarioServicio.generarPassword(usuarioGenerarPasswordDTO.getMail(),usuarioGenerarPasswordDTO.getPassword());  
       
    }


}
