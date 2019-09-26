module.exports = {
    getAllTasks: (req, res) => {
        // TODO: Get all tasks
        res.send({user: {"name": "Alice", "email": "Alice@nexus6.com"}, "tasks": ["Task 1", "Task 2"]});
    },
    createTask: (req, res) => {
        const { title } = req.body;
        console.log(req.body);
        if (title !== undefined && title !== "") {
            // TODO: Create new task
            res.send({user: {"name": "Alice", "email": "Alice@nexus6.com"}, "tasks": ["Task 1", "Task 2"]});
        }
        else
            {
            // Missing required value
            console.error("Missing required parameter", req);
            res.sendStatus(400);
            }
    },
    updateTask: (req, res) => {
        const { title, index } = req.body;
        if ((title !== undefined && title !== "") && (index !== undefined && index !== "")) {
            // TODO: Update task
            res.send({user: {"name": "Alice", "email": "Alice@nexus6.com"}, "tasks": ["Task 1", "Task 2"]});
        }else {
            // Missing required value
            console.error("Missing required parameter", req);
            res.sendStatus(400);
        }
    },
    deleteTask: (req, res) => {
        const { index } = req.body;
        if (index !== undefined && index !== "") {
            // TODO: Delete task
            res.send({user: {"name": "Alice", "email": "Alice@nexus6.com"}, "tasks": ["Task 1", "Task 2"]});
        }else {
            // Missing required value
            console.error("Missing required parameter", req);
            res.sendStatus(400);
        }
    }
};