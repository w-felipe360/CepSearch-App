package ti.solution.backend.dto;

import ti.solution.backend.entity.User;

public record UserResponseDto(
    Long id,
    String name,
    String cpf,
    String cep,
    String logradouro,
    String bairro,
    String cidade,
    String estado
) {
    public UserResponseDto(User user) {
        this(
            user.getId(),
            user.getName(),
            user.getCpf(),
            user.getCep(),
            user.getLogradouro(),
            user.getBairro(),
            user.getCidade(),
            user.getEstado()
        );
    }
}