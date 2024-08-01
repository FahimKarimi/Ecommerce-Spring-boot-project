package com.mohamadreza.demo.controller;

import com.mohamadreza.demo.model.Employee;
import com.mohamadreza.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/add")
    public String add(@RequestBody Employee employee) {
        employeeService.saveEmployee(employee);
        return "New employee successfully added";
    }

    @CrossOrigin
    @GetMapping("/getAllEmployees")
    public List<Employee> getAllEmployees() {

        return employeeService.getAllEmployee();
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<Optional<Employee>> getStudentById(@PathVariable("employeeId") int id) {
        Optional<Employee> employee = employeeService.findEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/{employeeId}")
    public ResponseEntity<Employee> updateEmployeeById(@RequestBody Employee employee, @PathVariable("employeeId") int id) {
        Employee updated = employeeService.updateEmployeeById(employee, id);
        return ResponseEntity.accepted().body(updated);
    }

    @DeleteMapping("/{employeeId}")
    public ResponseEntity<?> deleteEmployeeById(@PathVariable("employeeId") int id) {
        employeeService.deleteEmployeeById(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}

