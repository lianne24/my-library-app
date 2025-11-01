
package com.rest.webservices.restfulwebservices.book;

import java.time.LocalDate;

public class Book {

	private int id;
	private String username;
	private LocalDate targetDate;
	private boolean done;
	
	//Constructor with fields
	public Book(int id, String username, LocalDate targetDate, boolean done) {
		super();
		this.id = id;
		this.username = username;
		this.targetDate = targetDate;
		this.done = done;
	}
	
	//Default constructor
	public Book() {
		
	}
	

	//Getters and setters for all fields
	public int getId() {
		return id;
	}

	public void setId(int id) {
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

	@Override
	public String toString() {
		return "Book [id=" + id + ", username=" + username + ", targetDate=" + targetDate + ", done=" + done + "]";
	}
	
	
}
