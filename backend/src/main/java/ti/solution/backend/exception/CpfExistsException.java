package ti.solution.backend.exception;

public class CpfExistsException extends RuntimeException {
    
    public CpfExistsException() {
        super("CPF já está cadastrado.");
    }

    public CpfExistsException(String message) {
        super(message);
    }
}
