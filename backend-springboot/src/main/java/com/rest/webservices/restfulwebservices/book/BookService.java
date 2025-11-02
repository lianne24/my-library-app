package com.rest.webservices.restfulwebservices.book;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.stereotype.Service;

//-------------------------
//BookService Class - service layer for managing Book objects
//-------------------------

@Service // Marks this class as a Spring-managed service component
public class BookService {

	// A static list simulates a database table for books.
	private static List<Book> books = new ArrayList<>();
	
	// Counter used to assign unique IDs to books.
	private static int booksCount = 0;

	// Initializes the "database" with a few sample Book records.
	static {
		books.add(new Book(++booksCount, "lianne24","The Lord of the Rings", 
							LocalDate.now().plusMonths(5), false ));
		books.add(new Book(++booksCount, "lianne24","To Kill a Mockingbird", 
				LocalDate.now().plusMonths(11), false ));
		books.add(new Book(++booksCount, "lianne24","One Hundred Years of Solitude", 
				LocalDate.now().plusMonths(12), false ));
	}
	

	// Returns a list of books belonging to a specific user.
	public List<Book> findByUsername(String username){
		Predicate<? super Book> predicate = 
				book -> book.getUsername().equalsIgnoreCase(username);
		return books.stream().filter(predicate).toList();
	}
	

	// Adds a new book to the list with the given details and auto-increments the ID.
	public Book addBook(String username, String description, LocalDate targetDate, boolean done) {
		Book book = new Book(++booksCount,username,description,targetDate,done);
		books.add(book);
		return book;

	}
	
	// Deletes a book from the list by its ID.
	public void deleteById(int id) {
		Predicate<? super Book> predicate = book -> book.getId() == id;
		books.removeIf(predicate); // removes any book that matches the predicate
	}

	// Finds and returns a book by its ID.
	public Book findById(int id) {
		Predicate<? super Book> predicate = book -> book.getId() == id;
		Book book = books.stream().filter(predicate).findFirst().get();
		return book;
	}

	// Updates an existing book by removing it (based on ID)
	public void updateBook(Book book) {
		deleteById(book.getId()); // remove the old version
		books.add(book); // add the updated one
	}
	
}
