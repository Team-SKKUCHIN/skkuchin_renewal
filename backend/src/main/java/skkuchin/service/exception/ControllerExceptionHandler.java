package skkuchin.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import skkuchin.service.api.dto.CMRespDto;

@RestController
@ControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler(CustomValidationApiException.class)
    public ResponseEntity<?> validationException(CustomValidationApiException e) {
        return new ResponseEntity<>(new CMRespDto<>(-1, e.getMessage(), e.getErrorMap()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomRuntimeException.class)
    public ResponseEntity<?> runtimeException(CustomRuntimeException e) {
        return new ResponseEntity<>(new CMRespDto<>(-1, e.getMessage(), e.getContent()), HttpStatus.BAD_REQUEST);
    }

}
