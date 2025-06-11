package ti.solution.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ti.solution.backend.dto.UserDto;
import ti.solution.backend.dto.UserResponseDto;
import ti.solution.backend.entity.User;
import ti.solution.backend.exception.CpfExistsException;
import ti.solution.backend.exception.UserNotExistsException;
import ti.solution.backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(UserDto user) {
        if (userRepository.existsByCpf(user.cpf())) {
            throw new CpfExistsException();
        }
        User newUser = new User(user);
        userRepository.save(newUser);
    }

    public List<UserResponseDto> getAll() {
        return userRepository.findAll().stream().map(UserResponseDto::new).toList();
    }

    public UserResponseDto getUserById(Long id) throws UserNotExistsException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotExistsException("Usuário não encontrado com ID: " + id));
        return new UserResponseDto(user);
    }

    public void deleteUser(Long id) throws UserNotExistsException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotExistsException("Usuário não encontrado com ID: " + id));
        userRepository.delete(user);
    }

public void updateUser(Long id, UserDto userDto) throws UserNotExistsException {
    User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotExistsException("Usuário não encontrado com ID: " + id));
    user.updateFromDto(userDto);
    userRepository.save(user);
}

}
