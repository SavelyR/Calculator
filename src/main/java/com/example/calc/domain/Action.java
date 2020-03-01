package com.example.calc.domain;

import javax.persistence.*;

@Entity
@Table
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String data;

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }


}