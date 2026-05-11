package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AuthController {

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri:http://localhost:8080/realms/Tingeso_Db}")
    private String keycloakIssuerUri;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestParam String username,
            @RequestParam String password) {
        try {
            String tokenUrl = keycloakIssuerUri + "/protocol/openid-connect/token";

            Map<String, String> body = new HashMap<>();
            body.put("grant_type", "password");
            body.put("client_id", "travel-agency-client");
            body.put("client_secret", "${KEYCLOAK_CLIENT_SECRET}"); // Usa variable de entorno
            body.put("username", username);
            body.put("password", password);
            body.put("scope", "openid profile email");

            Map<String, Object> response = restTemplate.postForObject(tokenUrl, body, Map.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid credentials");
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, Object>> refresh(
            @RequestParam String refreshToken) {
        try {
            String tokenUrl = keycloakIssuerUri + "/protocol/openid-connect/token";

            Map<String, String> body = new HashMap<>();
            body.put("grant_type", "refresh_token");
            body.put("client_id", "travel-agency-client");
            body.put("client_secret", "${KEYCLOAK_CLIENT_SECRET}");
            body.put("refresh_token", refreshToken);

            Map<String, Object> response = restTemplate.postForObject(tokenUrl, body, Map.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }
}
