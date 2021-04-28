package com.accenture.urobzmenu.todolist;

import java.time.LocalDate;
import java.util.List;

public class ToDoItemValidator {

	public static void validate(ToDoItem toDoItem, 
			ToDoItemValidatorExternalConfiguration configuration) {
		if (toDoItem.getName().length() > configuration.getNameSize()) {
			throw new RuntimeException("Toto nie je validny toDoItem (name too long). "
					+ "Expected : " + configuration.getNameSize());
		}

		if(toDoItem.getDueDate().isBefore(LocalDate.now())) {
			throw new RuntimeException("Due date must be today or later");
		}
	}

	public static void validate(List<ToDoItem> list) {
		if (list.size() > 30) {
			throw new RuntimeException("Privela zaznamov v liste!");
		}
	}

	public static void validate(ToDoItem newToDoItem, List<ToDoItem> listToDoItemov) {
		for (ToDoItem prvok : listToDoItemov) {
			if (prvok.getName().equals(newToDoItem.getName())) {
				throw new RuntimeException("Nazov je duplicitny");
			}
		}
	}
}
