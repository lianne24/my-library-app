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

import com.rest.webservices.restfulwebservices.book.repository.BookRepository;

//BookJpaResource (REST Controller) - defines REST API end points for interacting with Book data.

@RestController // Marks this class as a RESTful controller (returns JSON instead of HTML)
public class BookJpaResource {
	
	// The BookService is automatically injected by Spring Boot.
	private BookService bookService;
	
	private BookRepository bookRepository;
	
	// Constructor-based dependency injection
	public BookJpaResource(BookService bookService, BookRepository bookRepository) {
		this.bookService = bookService;
		this.bookRepository = bookRepository;
	}
	
	// Basic authentication URL
	@GetMapping("/basicauth")
	public String basicAuthentication(){
		return "Success";
	}
	
	// Retrieves all books for a given username.
	@GetMapping("/users/{username}/books")
	public List<Book> retrieveBooks(@PathVariable String username){
		return bookRepository.findByUsername(username);
	}
	
	// Retrieves a single book by its ID.
	@GetMapping("/users/{username}/books/{id}")
	public Book retrieveBook (@PathVariable String username, @PathVariable int id) {
		return bookRepository.findById(id).get();
	}
	
	// Deletes a specific book by ID for a given user.
	@DeleteMapping("/users/{username}/books/{id}")
	public ResponseEntity<Void> deleteBook(@PathVariable String username, @PathVariable int id){
		bookRepository.deleteById(id);
		
		// ResponseEntity.noContent() builds an HTTP 204 response (no body)
		return ResponseEntity.noContent().build();
	}
	
	//Update information for book with specific id for a given user
	@PutMapping("/users/{username}/books/{id}")
	public Book updateBook(@PathVariable String username, @PathVariable int id, @RequestBody Book book){
		bookRepository.save(book);
		return book;
	}
	
	//Added new book with details for a given user
	@PostMapping("/users/{username}/books")
	public Book createBook(@PathVariable String username, @RequestBody Book book){
		
		book.setUsername(username);
		book.setId(null);
		
		return bookRepository.save(book);
	}

}
