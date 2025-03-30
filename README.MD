# Task App

A simple task management application built with Node.js, Express, and MongoDB.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Benevanio/task-app.git
```

2. Install dependencies:

```bash
cd task-app
npm install
```

3. Create a `.env` file in the root directory and add your MongoDB connection URL and port:

```
MONGO_URL=<your_mongodb_connection_url>
PORT=<your_desired_port>
```

4. Start the server:

```bash
npm start
```

Now you can access the application at `http://localhost:<your_desired_port>`.

## API Endpoints

The following API endpoints are available:

- `GET /`: Returns a welcome message.
- `POST /tasks`: Creates a new task.
- `GET /tasks`: Retrieves all tasks.
- `GET /tasks/:id`: Retrieves a specific task by ID.
- `PATCH /tasks/:id`: Updates a specific task by ID.
- `DELETE /tasks/:id`: Deletes a specific task by ID.

## Example Usage

To create a new task, send a POST request to `http://localhost:<your_desired_port>/tasks` with the following JSON payload:

```json
{
  "description": "Complete the task app",
  "completed": false
}
```

To retrieve all tasks, send a GET request to `http://localhost:<your_desired_port>/tasks`.

To retrieve a specific task by ID, send a GET request to `http://localhost:<your_desired_port>/tasks/:id`.

To update a specific task by ID, send a PATCH request to `http://localhost:<your_desired_port>/tasks/:id` with the updated JSON payload.

To delete a specific task by ID, send a DELETE request to `http://localhost:<your_desired_port>/tasks/:id`.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgments

This project was built as part of a Node.js course.