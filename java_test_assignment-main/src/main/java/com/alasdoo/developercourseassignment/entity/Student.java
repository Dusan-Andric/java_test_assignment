package com.alasdoo.developercourseassignment.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "student")
public class Student implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;
    @Column(name = "name", nullable = false, length = 250)
    private String name;
    @Column(name = "surname", nullable = false, length = 250)
    private String surname;
    @Column(name = "account_name", nullable = false, length = 250, unique = true)
    private String accountName;
    @Column(name = "password", nullable = false, length = 250)
    private String password;
    @Column(name = "email", nullable = false, length = 250, unique = true)
    private String email;
    @Column(name = "bank_card_number", nullable = false, length = 16)
    private Integer bankCardNumber;

    public Student() {
    }

    public Student(String name, String surname, String accountName, String password, String email, Integer bankCardNumber) {
        this.name = name;
        this.surname = surname;
        this.accountName = accountName;
        this.password = password;
        this.email = email;
        this.bankCardNumber = bankCardNumber;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getBankCardNumber() {
        return bankCardNumber;
    }

    public void setBankCardNumber(Integer bankCardNumber) {
        this.bankCardNumber = bankCardNumber;
    }
}
