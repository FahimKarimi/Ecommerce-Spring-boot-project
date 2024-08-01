package com.mohamadreza.demo.service;


import com.mohamadreza.demo.model.Employee;
import com.mohamadreza.demo.repository.EmployeeRepository;
import io.micrometer.common.util.StringUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployee() {
        List<Employee> employees = employeeRepository.findAll();
        if (employees.isEmpty()) {
            throw new NullPointerException("No employee found");
        }
        return employees;
    }

    public Optional<Employee> findEmployeeById(int id) {

        return employeeRepository.findById(id);
    }

    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateEmployeeById(Employee employee, int id) {
        Employee updateEmployee = employeeRepository.findById(id).orElseThrow(() -> new NullPointerException("Employee not found for this id :: " + id));

        updateEmployee.setName(employee.getName());
        updateEmployee.setAge(employee.getAge());
        updateEmployee.setEmail(employee.getEmail());
        updateEmployee.setRole(employee.getRole());
        updateEmployee.setTeam(employee.getTeam());
        updateEmployee.setStatus(employee.getStatus());
        updateEmployee.setAvatar(employee.getAvatar());

        employeeRepository.save(updateEmployee);
        return updateEmployee;
    }

    public void deleteEmployeeById(int id) {
        if (id == 0) {
            throw new NullPointerException("You need to provide ID of student to be deleted. ID can not be 0.");
        }
        Optional<Employee> checkIfEmployeeWithIdExist = employeeRepository.findById(id);
        if (checkIfEmployeeWithIdExist.isEmpty()) {
            throw new NullPointerException(
                    "Employee can not be deleted because employee with id: " + id + " does not exist.");
        }
        employeeRepository.deleteById(id);
    }
}


