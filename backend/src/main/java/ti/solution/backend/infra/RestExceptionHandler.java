package ti.solution.backend.infra;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import ti.solution.backend.exception.CpfExistsException;
import ti.solution.backend.exception.UserNotExistsException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

@Override
protected ResponseEntity<Object> handleMethodArgumentNotValid(
    MethodArgumentNotValidException ex,
    HttpHeaders headers,
    HttpStatusCode status,
    WebRequest request
) { // trata erros de validação genéricos em obj message
    String firstErrorMessage = ex.getBindingResult()
        .getFieldErrors()
        .stream()
        .findFirst()
        .map(error -> error.getDefaultMessage())
        .orElse("Dados inválidos");

    Map<String, String> response = new HashMap<>();
    response.put("message", firstErrorMessage);

    return ResponseEntity.badRequest().body(response);
}


    @ExceptionHandler(CpfExistsException.class)
    private ResponseEntity<RestErrorMessage> cpfExistsHandler(CpfExistsException exception) {
        RestErrorMessage threatResponse = new RestErrorMessage(HttpStatus.BAD_REQUEST, exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(threatResponse);
    }
    
    @ExceptionHandler(UserNotExistsException.class)
private ResponseEntity<RestErrorMessage> userNotExistsHandler(UserNotExistsException exception) {
    RestErrorMessage errorResponse = new RestErrorMessage(HttpStatus.NOT_FOUND, exception.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
}

}
