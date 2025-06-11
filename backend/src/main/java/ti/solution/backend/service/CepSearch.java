package ti.solution.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ti.solution.backend.dto.CepDto;

@Service
public class CepSearch {

    private final RestTemplate restTemplate = new RestTemplate();

    public CepDto buscarCep(String cep) {
        String url = String.format("https://viacep.com.br/ws/%s/json/", cep);
        CepDto resposta = restTemplate.getForObject(url, CepDto.class);
        return resposta;
    }
}
