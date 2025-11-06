
package com.rest.webservices.restfulwebservices.book;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;


//-------------------------
//Book Entity
//-------------------------
//This class represents the "Book" data model used in the application.
//Each Book object holds information about a user's book, including its description, completion status, and target date.

@Entity
public class Book {

	// -------------------------
	// Fields (Attributes)
	// -------------------------
	
	@Id
	@GeneratedValue
	private Integer id;
	
	private String username;
	private String description;
	private LocalDate targetDate;
	private boolean done;
	
	//Constructor (Parameterized)
	public Book(Integer id, String username, String description, LocalDate targetDate, boolean done) {
		super();
		this.id = id;
		this.username = username;
		this.description = description;
		this.targetDate = targetDate;
		this.done = done;
	}
	
	//Default Constructor
	public Book() {
		
	}
	

	//Getters and Setters
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public LocalDate getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(LocalDate targetDate) {
		this.targetDate = targetDate;
	}

	public boolean isDone() {
		return done;
	}

	public void setDone(boolean done) {
		this.done = done;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Book [id=" + id + ", username=" + username + ", description=" + description + ", targetDate="
				+ targetDate + ", done=" + done + "]";
	}
	
}
