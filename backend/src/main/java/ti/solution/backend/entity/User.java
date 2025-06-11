package ti.solution.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import ti.solution.backend.dto.UserDto;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    public User(UserDto user) {
        this.name = user.name();
        this.cpf = user.cpf();
        this.cep = user.cep();
        this.logradouro = user.logradouro();
        this.bairro = user.bairro();
        this.cidade = user.cidade();
        this.estado = user.estado();
    }

    public void updateFromDto(UserDto dto) {
        this.name = dto.name();
        this.cep = dto.cep();
        this.logradouro = dto.logradouro();
        this.bairro = dto.bairro();
        this.cidade = dto.cidade();
        this.estado = dto.estado();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true, length = 11)
    private String cpf;

    @Column(nullable = false, length = 8)
    private String cep;

    @Column(nullable = false)
    private String logradouro;

    @Column(nullable = false)
    private String bairro;

    @Column(nullable = false)
    private String cidade;

    @Column(nullable = false)
    private String estado;

    @CreationTimestamp
    private Instant creationTimeStamp;

    @UpdateTimestamp
    private Instant updateTimeStamp;
}
