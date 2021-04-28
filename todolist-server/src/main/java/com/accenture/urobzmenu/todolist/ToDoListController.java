package com.accenture.urobzmenu.todolist;

import com.accenture.urobzmenu.todolist.database.DbToDoItem;
import com.accenture.urobzmenu.todolist.database.DbToDoItemMapper;
import com.accenture.urobzmenu.todolist.database.DbToDoItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000") //ignore
public class ToDoListController {


	private DbToDoItemRepository repository;
	
	private ToDoItemValidatorExternalConfiguration configuration;

	public ToDoListController(DbToDoItemRepository repository, 
			ToDoItemValidatorExternalConfiguration configuration) {
		this.repository = repository;
		this.configuration = configuration;
	}


	@RequestMapping(value = "/todos", method = RequestMethod.POST)
	public void addTodoItem(@RequestBody ToDoItem input) {
		System.out.println("New TODO item received: " + input);

		// validation
		ToDoItemValidator.validate(input, configuration);

		// vyhodit generovanie ID
		// menej striktny validator 3 -> 30, 10 -> 100
		DbToDoItem dbToDoItem = DbToDoItemMapper.map(input);
		repository.save(dbToDoItem);
	}

	@RequestMapping(value = "/todos", method = RequestMethod.GET)
	public List<ToDoItem> fetch() {
		Iterable<DbToDoItem> dbToDoItems = repository.findAllByOrderByCompletedAscNameDesc();

		List<ToDoItem> response = new ArrayList<>();
		for (DbToDoItem dbToDoItem : dbToDoItems) {
			ToDoItem toDoItem = DbToDoItemMapper.map(dbToDoItem);
			response.add(toDoItem);
		}

		System.out.println("Returning todos: " + response);
		return response;
	}

	@RequestMapping(value = "/todos/delete/all", method = RequestMethod.DELETE)
	public void removeAll() {
		repository.deleteAll();
	}

	@RequestMapping(value = "/todos/{id}", method = RequestMethod.DELETE)
	public void removeToDoItem(@PathVariable String id) {
		repository.deleteById(id);
	}

	@RequestMapping(value = "/todos/{id}", method = RequestMethod.PUT)
	public void updateToDoItem(@RequestBody ToDoItem request, @PathVariable String id) {
		// import java.util.Optional;
		Optional<DbToDoItem> optionalDbToDoItem = repository.findById(id);

		if (optionalDbToDoItem.isPresent()) {
			DbToDoItem dbToDoItem = optionalDbToDoItem.get();

			dbToDoItem.setCompleted(request.isCompleted());

			repository.save(dbToDoItem); // update
		}
	}
}

