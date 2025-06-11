package ti.solution.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserDto(
    @NotBlank(message = "Nome é obrigatório")
    String name,

    @NotBlank(message = "CPF é obrigatório")
    @Size(min = 11, max = 11, message = "CPF deve conter 11 caracteres")
    String cpf,

    @NotBlank(message = "CEP é obrigatório")
    @Size(min = 8, max = 8, message = "CEP deve conter exatamente 8 caracteres")
    String cep,

    @NotBlank(message = "Logradouro é obrigatório")
    String logradouro,

    @NotBlank(message = "Bairro é obrigatório")
    String bairro,

    @NotBlank(message = "Cidade é obrigatória")
    String cidade,

    @NotBlank(message = "Estado é obrigatório")
    String estado
){}
