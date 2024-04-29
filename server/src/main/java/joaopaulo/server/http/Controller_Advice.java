package joaopaulo.server.http;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class Controller_Advice {

    @ExceptionHandler(ResponseStatusException.class)
    @ResponseBody
    public ResponseEntity<String> handleResponseStatusException(ResponseStatusException ex) {
        HttpStatus status = (HttpStatus) ex.getStatusCode();
        Message message = new Message(ex.getReason());
        return new ResponseEntity<>(message.toString(), status);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMessage = Objects.requireNonNull(ex.getBindingResult().getFieldError()).getDefaultMessage();
        Message message = new Message(errorMessage);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message.toString());
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<String> handleOtherExceptions(Exception ex) {
        String errorMessage = ex.getMessage();
        Message message = new Message(errorMessage);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
    }
}
