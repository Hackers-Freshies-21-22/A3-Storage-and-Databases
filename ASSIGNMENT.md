# Main mission (Levels):

1. List my own tasks
    - Edit the `add` and `list` function such that only tasks unique to your `chatId` is shown when you call `/list`.

2. Mark as complete
    - Implement a function `done` such that tasks can be marked as done.
    ```
    User : "done exercise"
    Bot  : "Marked as complete: exercise"
    ```
    - Edit `list` such that tasks marked as done will be shown with a [X]
    ```
    User : "list"
    Bot  : "1. exercise [X]"
    ```

3. Delete tasks
    - Implement a function `delete` such that tasks can be deleted from the database.
    ```
    User : "delete exercise"
    Bot  : "Deleted: exercise"
    ```

  
## Optional challenge:
- Add tagging 
- Pick random todo
- Implement search function
