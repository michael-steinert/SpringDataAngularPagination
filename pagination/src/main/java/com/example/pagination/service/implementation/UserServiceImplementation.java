package com.example.pagination.service.implementation;

import com.example.pagination.model.User;
import com.example.pagination.repository.UserRepository;
import com.example.pagination.service.IUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImplementation implements IUserService {
    private final UserRepository userRepository;

    @Override
    public Page<User> getUsers(String name, int page, int size) {
        log.info("Finding User for Page {} of Size {}", page, size);
        return userRepository.findByNameContaining(name, PageRequest.of(page, size));
    }
}
