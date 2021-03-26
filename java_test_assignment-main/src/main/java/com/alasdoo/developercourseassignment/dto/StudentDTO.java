package com.alasdoo.developercourseassignment.dto;

import java.io.Serializable;

public class StudentDTO implements Serializable {

    private Integer id;
    private String name;
    private String surname;
    private String accountName;
    private String email;
    private String password;
    private Integer bankCardNumber;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getBankCardNumber() {
        return bankCardNumber;
    }

    public void setBankCardNumber(Integer bankCardNumber) {
        this.bankCardNumber = bankCardNumber;
    }
}
