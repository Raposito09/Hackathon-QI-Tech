package com.inovacamp.core_api.domain.repository;

import com.inovacamp.core_api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repositório para gerenciar a entidade User.
 * Fornece métodos CRUD e consultas customizadas relacionadas a usuários.
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    /**
     * Busca um usuário pelo seu endereço de e-mail.
     * O Spring Data JPA cria a implementação deste método automaticamente
     * com base no nome do método.
     *
     * @param email O e-mail do usuário a ser buscado.
     * @return um Optional contendo o User se encontrado, ou um Optional vazio caso contrário.
     */
    Optional<User> findByEmail(String email);

}