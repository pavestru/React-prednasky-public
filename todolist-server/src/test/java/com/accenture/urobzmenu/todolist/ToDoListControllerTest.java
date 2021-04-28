package com.accenture.urobzmenu.todolist;

import com.accenture.urobzmenu.todolist.database.DbToDoItem;
import com.accenture.urobzmenu.todolist.database.DbToDoItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;

class ToDoListControllerTest {

    private ToDoListController controller;

    private ToDoItemValidatorExternalConfiguration configuration;
    private DbToDoItemRepository repository;

    @BeforeEach
    void setUp() throws Exception {
        repository = mock(DbToDoItemRepository.class);
        configuration = mock(ToDoItemValidatorExternalConfiguration.class);
        controller = new ToDoListController(repository, configuration);
    }

    @Test
    void testAddTodoItem() {
        // prepare
        ToDoItem item = new ToDoItem();
        item.setName("Name");
        item.setCompleted(false);
        item.setDescription("descrition");
        item.setDueDate(LocalDate.now()); // will always give todays date (dueDate validation)

        when(configuration.getNameSize()).thenReturn(4);

        // act
        controller.addTodoItem(item);

        // verify
        verify(repository, times(1)).save(any());
    }

    @Test
    void testAddTodoItem_NameTooLong() {
        // prepare
        ToDoItem item = new ToDoItem();
        item.setName("1234");
        item.setCompleted(false);
        item.setDescription("descrition");

        when(configuration.getNameSize()).thenReturn(3); // name is 4 characters long

        // act & verify
        assertThrows(RuntimeException.class, () -> controller.addTodoItem(item));
    }

    @Test
    void testAddTodoItem_NullPointerException() {
        // prepare
        ToDoItem item = new ToDoItem();

        // act and verify
        assertThrows(NullPointerException.class, () -> {
            this.controller.addTodoItem(item);
        });
    }

    @Test
    void testFetch_ZeroList() {
        // prepare

        //act
        List<ToDoItem> result = this.controller.fetch();

        // verify
        assertNotNull(result);
        assertEquals(0, result.size());
    }

    @Test
    void testFetch_1ItemList() {
        // prepare
        List<DbToDoItem> dbToDoItems = new ArrayList<DbToDoItem>();
        DbToDoItem item = new DbToDoItem();
        item.setCompleted(false);
        item.setId("DDD");
        item.setDescription("description");
        item.setName("Name");
        dbToDoItems.add(item);
        doReturn(dbToDoItems).when(this.repository).findAllByOrderByCompletedAscNameDesc();

        //act
        List<ToDoItem> result = this.controller.fetch();

        // verify
        assertNotNull(result);
        assertEquals(1, result.size());

        //  add asserts na prvy prvok ...
    }

    @Test
    void testRemoveAll() {
        // prepare empty
        // act
        this.controller.removeAll();
        // verify
        verify(this.repository, times(1)).deleteAll();
    }

    @Test
    void testRemoveById() {
        // prepare empty
        // act
        this.controller.removeToDoItem("1");
        // verify
        verify(this.repository, times(1)).deleteById(any());
    }
    // test na remove, removeAll - overit, ze sa to zavolalo prave raz !!!
}
