package com.karim.sslserver.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.karim.sslserver.model.Book;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class BookController {
	
	private static final List<Book> books = new ArrayList<>();
	static {
		books.add(new Book("Da vinci code", "18 Mars 2003"));
	}

	@RequestMapping("/books")
	public List<Book> getBooks() {
		return books;
	}
	
	@RequestMapping("/books/filter")
	public List<Book> filterBook(@RequestParam String name) {
		return books.stream().filter(book -> book.getName().equals(name)).collect(Collectors.toList());
	}

}
