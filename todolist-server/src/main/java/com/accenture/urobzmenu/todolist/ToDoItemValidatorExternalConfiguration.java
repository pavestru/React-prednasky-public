package com.accenture.urobzmenu.todolist;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ToDoItemValidatorExternalConfiguration {

	
	@Value( "${validator.nameSize}" )
	private int nameSize;
	
	@Value( "${validator.listSize}" )
	private int listSize;

	public int getNameSize() {
		return nameSize;
	}

	public int getListSize() {
		return listSize;
	}
	
}
