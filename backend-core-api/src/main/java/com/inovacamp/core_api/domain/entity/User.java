package com.inovacamp.core_api.domain.entity;

import com.inovacamp.core_api.domain.enums.KycStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Data // Gera Getters, Setters, toString, equals e hashCode
@Builder // Padrão de projeto Builder para construir objetos
@NoArgsConstructor // Construtor sem argumentos (requerido pelo JPA)
@AllArgsConstructor // Construtor com todos os argumentos
@Entity // Marca esta classe como uma entidade JPA
@Table(name = "users") // Mapeia para a tabela "users" no banco (evita conflito com a palavra reservada USER)
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING) // Grava o enum como String ("PENDING") no banco, não como número (0)
    @Column(nullable = false)
    private KycStatus kycStatus;

    @CreationTimestamp // Define o valor automaticamente na criação
    private LocalDateTime createdAt;

    @UpdateTimestamp // Define o valor automaticamente na atualização
    private LocalDateTime updatedAt;

    // MÉTODOS DA INTERFACE UserDetails (INTEGRAÇÃO COM SPRING SECURITY)

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Por enquanto, todo usuário terá a role "USER".
        // Isso pode ser expandido para um campo na entidade no futuro.
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        // O Spring Security usará o email como nome de usuário para autenticação.
        return this.email;
    }

    @Override
    public String getPassword() {
        // Retorna a senha armazenada do usuário.
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // A conta nunca expira
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // A conta nunca é bloqueada
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // As credenciais nunca expiram
    }

    @Override
    public boolean isEnabled() {
        return true; // A conta está sempre habilitada
    }

    @Column
    private Integer creditScore;
}