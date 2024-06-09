package agro.envioCorreo;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CorreoServicio {
    private final JavaMailSender emailSender;
    public void enviarCorreo(String correoUsuario, String asunto,String texto) throws MessagingException {
   		MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(correoUsuario);
        helper.setSubject(asunto);
        helper.setText(texto);
        emailSender.send(message);
		
    }
}
