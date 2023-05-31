package com;

import java.io.Serializable;

public class User implements Serializable {
  private String name;

  public User(String name) {
    this.name = name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return this.name;
  }

  public String greet(String text) {
    return text;
  }

  @Override
  public String toString() {
    return "com.User(" + this.name + ")";

  }
}