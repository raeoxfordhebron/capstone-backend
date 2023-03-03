# Book Library


[Trello Board Link](https://trello.com/b/e9tUtCcX/capstone)

### Technologies Used
- Oracle
- Node.js
- Sequelize
- React
- HTML
- CSS

### Routes & Components
```
App --> Header
App --> Outlet
Outlet -- "/" --> Index
Outlet -- "/jobs/:id" --> Show
Outlet -- "/jobs/create" --> createAction
Outlet -- "/jobs/update/:id" --> updateAction
Outlet -- "/jobs/delete/:id" --> deleteAction
```

| Route | Element | Loader | Action | Summary |
| ----- | ------- | ------ | ------ | ------- |
|   /   |  Index  | indexLoader |   | Show all books and authors |
| /books/:id | bookShow | bookLoader | | Show one book |
| /authors/:id | authorShow | authorLoader | | Show one author |
| /books/create | bookCreate | | createBook | Create a book |
| /authors/create | authorCreate | | createAuthor | Create an author |
| /books/update/:id | bookUpdate | | updateBook | Update a book |
| /authors/update/:id | authorUpdate | | updateAuthor | Update an author |
| /books/delete/:id | bookDelete | | deleteBook | Delete a book |
| /authors/delete/:id | authorDelete | | deleteAuthor | Delete an author |

### User Stories
- As a user, I want to be able to create, update, and delete a book.
- As a user, I want to be able to create, update, and delete an author.

[Data Schema](https://drawsql.app/teams/seir-turmeric/diagrams/capstone)

### Wireframes & Mockups

### Daily Plan
