
package agro;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

//import agro.envioCorreo.CorreoServicio;

@SpringBootApplication
@RestController
// @ComponentScan("agro.personas") // Agregar esta línea para escanear los
// componentes en el paquete
// 'agro.personas'
public class ServiciosApplication implements CommandLineRunner {
	// @Autowired

	public static void main(String[] args) {
		SpringApplication.run(ServiciosApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// correoServicio.enviarCorreo("joaquin_suardi@hotmail.com", "Prueba", "Prueba
		// de envio de Correo");

	}

}
