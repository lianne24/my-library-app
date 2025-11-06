package com.rest.webservices.restfulwebservices.book.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rest.webservices.restfulwebservices.book.Book;

public interface BookRepository extends JpaRepository<Book, Integer>{

	List<Book> findByUsername(String username);
}
