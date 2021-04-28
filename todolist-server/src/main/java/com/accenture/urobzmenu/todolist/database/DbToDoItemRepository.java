package com.accenture.urobzmenu.todolist.database;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface DbToDoItemRepository extends CrudRepository<DbToDoItem, String> {

    @Query("select todo from TODO_ITEM todo order by todo.name desc")
    Iterable<DbToDoItem> findAllSortedByName();

    Iterable<DbToDoItem> findAllByOrderByNameAsc();

    Iterable<DbToDoItem> findAllByOrderByCompletedAsc();

    Iterable<DbToDoItem> findAllByOrderByNameDescCompletedAsc();

    Iterable<DbToDoItem> findAllByOrderByCompletedAscNameDesc();

    @Query("select todo from TODO_ITEM todo order by todo.completed, todo.name desc")
    Iterable<DbToDoItem> findAllSortedByStateAndName();
}
