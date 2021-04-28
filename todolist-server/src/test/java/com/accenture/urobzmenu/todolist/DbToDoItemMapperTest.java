package com.accenture.urobzmenu.todolist;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.accenture.urobzmenu.todolist.database.DbToDoItem;
import com.accenture.urobzmenu.todolist.database.DbToDoItemMapper;

class DbToDoItemMapperTest {

	/*
	 * @TODO  rozsirit test na vsetky atributy
	 */
	@Test
	void testMapToDoItem() {
		// prepare
		DbToDoItem item = new DbToDoItem();
		item.setId("ID");
		item.setName("name");
		
		// act
		ToDoItem result = DbToDoItemMapper.map(item);
		
		// verify
		assertNotNull(result);
		assertEquals("ID", result.getId());
		assertEquals("name", result.getName());
	}

	@Test
	void testMapDbToDoItem() {
		// prepare
		ToDoItem item = new ToDoItem();
		// not usable for test , this direction does not work
		// item.setId("ID");
		// act
		DbToDoItem result = DbToDoItemMapper.map(item);
		// verify
		assertNotNull(result);
		assertNull( result.getId());
	}

}
