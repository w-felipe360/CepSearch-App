package ti.solution.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import ti.solution.backend.dto.CepDto;
import ti.solution.backend.service.CepSearch;

@RestController
@RequestMapping("/cep")
public class CepController {

    private final CepSearch cepSearch;

    public CepController(CepSearch cepSearch) {
        this.cepSearch = cepSearch;
    }

    @GetMapping("/{cep}")
    public ResponseEntity<CepDto> consultarCep(@PathVariable @Valid String cep) {
        try {
            CepDto cepDto = cepSearch.buscarCep(cep);
            return ResponseEntity.ok(cepDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
