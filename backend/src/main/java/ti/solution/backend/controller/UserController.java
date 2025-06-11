package ti.solution.backend.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ti.solution.backend.dto.UserDto;
import ti.solution.backend.dto.UserResponseDto;
import ti.solution.backend.exception.UserNotExistsException;
import ti.solution.backend.service.UserService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody @Valid UserDto userDto) {
        userService.createUser(userDto);
        return ResponseEntity.status(201).build();
    }

    @GetMapping()
    public ResponseEntity<List<UserResponseDto>> getAll() {
        List<UserResponseDto> users = userService.getAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) throws UserNotExistsException {
        UserResponseDto user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) throws UserNotExistsException {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUser(@PathVariable Long id,
            @RequestBody @Valid UserDto userDto)
            throws UserNotExistsException {
        userService.updateUser(id, userDto);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/")
    public ResponseEntity<?> userIdMissing() {
        Map<String, String> error = Map.of("message", "ID do usuário não informado.");
        return ResponseEntity.badRequest().body(error);
    }
}