package com.accenture.urobzmenu.todolist.database;

import com.accenture.urobzmenu.todolist.ToDoItem;

public class DbToDoItemMapper {

    public static DbToDoItem map(ToDoItem input) {
        DbToDoItem dbToDoItem = new DbToDoItem();
        dbToDoItem.setName(input.getName());
        dbToDoItem.setDescription(input.getDescription());
        dbToDoItem.setDueDate(input.getDueDate());
        dbToDoItem.setCompleted(input.isCompleted());
        System.out.println("Mapped to db entity: " + dbToDoItem);
        return dbToDoItem;
    }

    public static ToDoItem map(DbToDoItem dbToDoItem) {
        ToDoItem toDoItem = new ToDoItem();
        toDoItem.setId(dbToDoItem.getId());
        toDoItem.setName(dbToDoItem.getName());
        toDoItem.setDescription(dbToDoItem.getDescription());
        toDoItem.setDueDate(dbToDoItem.getDueDate());
        toDoItem.setCompleted(dbToDoItem.isCompleted());
        System.out.println("Mapped to transfer object: " + toDoItem);
        return toDoItem;
    }
}
