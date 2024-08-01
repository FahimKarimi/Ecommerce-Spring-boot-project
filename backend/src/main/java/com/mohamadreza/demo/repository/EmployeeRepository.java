package com.mohamadreza.demo.repository;

import com.mohamadreza.demo.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Optional<Employee> findEmployeeById(int id);


    Employee findEmployeeByEmail(String email);
}

