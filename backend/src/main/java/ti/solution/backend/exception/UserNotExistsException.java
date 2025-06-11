package ti.solution.backend.exception;

public class UserNotExistsException extends Exception {
    public UserNotExistsException() {
        super("Usuário não existe.");
    }

    public UserNotExistsException(String message) {
        super(message);
    }
}
