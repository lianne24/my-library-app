package com.rest.webservices.restfulwebservices.book;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//BookResource (REST Controller) - defines REST API end points for interacting with Book data.

@RestController // Marks this class as a RESTful controller (returns JSON instead of HTML)
public class BookResource {
	
	// The BookService is automatically injected by Spring Boot.
	private BookService bookService;
	
	// Constructor-based dependency injection
	public BookResource(BookService bookService) {
		this.bookService = bookService;
	}
	
	// Retrieves all books for a given username.
	@GetMapping("/users/{username}/books")
	public List<Book> retrieveBooks(@PathVariable String username){
		return bookService.findByUsername(username);
	}
	
	// Retrieves a single book by its ID.
	@GetMapping("/users/{username}/books/{id}")
	public Book retrieveBook (@PathVariable String username, @PathVariable int id) {
		return bookService.findById(id);
	}
	
	// Deletes a specific book by ID for a given user.
	@DeleteMapping("/users/{username}/books/{id}")
	public ResponseEntity<Void> deleteBook(@PathVariable String username, @PathVariable int id){
		bookService.deleteById(id);
		
		// ResponseEntity.noContent() builds an HTTP 204 response (no body)
		return ResponseEntity.noContent().build();
	}
	
	//Update information for book with specific id for a given user
	@PutMapping("/users/{username}/books/{id}")
	public Book updateBook(@PathVariable String username, @PathVariable int id, @RequestBody Book book){
		bookService.updateBook(book);
		
		// ResponseEntity.noContent() builds an HTTP 204 response (no body)
		return book;
	}
	
	//Added new book with details for a given user
	@PostMapping("/users/{username}/books")
	public Book createBook(@PathVariable String username, @RequestBody Book book){
		Book newBook = bookService.addBook(username, book.getDescription(), book.getTargetDate(), book.isDone());
		
		return newBook;
	}

}
