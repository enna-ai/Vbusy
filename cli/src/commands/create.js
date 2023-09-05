import { Command } from "commander";
import { input, select } from "@inquirer/prompts";
import TaskAPI from "../../../common/api.js";
import { isValidDate } from "../helpers/validate.js";

const createCommand = new Command("create")
    .description("Create a task")
    .action(async () => {
        try {
            const taskName = await input({
                message: "Enter a new task:",
                validate: (value) => {
                    if (!value) {
                        return "Please provide a task!";
                    }

                    return true;
                }
            });
            
            const priorityChoice = await select({
                message: "Select a task priority",
                choices: [
                    {
                        name: "low",
                        value: "low",
                        description: "Task is of low priority",
                    },
                    {
                        name: "medium",
                        value: "medium",
                        description: "Task is of medium priority",
                    },
                    {
                        name: "high",
                        value: "high",
                        description: "Task is of high priority",
                    }
                ]
            });

            let taskDate;
            const taskDueDateInput = await input({ message: "Enter due date (YYYY-MM-DD):" });
            const taskDueDate = await isValidDate(taskDueDateInput);
            if (taskDueDate) {
                taskDate = taskDueDate[0];
            } else {
                taskDate = null;
            }

            const newTask = await TaskAPI.createTask(taskName, priorityChoice, taskDate);
            if (newTask) {
                console.log(`Created new task '${taskName}'!`);
            } else {
                console.log("An error occured trying to create task.");
            }
        } catch (error) {
            console.error(error.message);
        }
    });

export default createCommand;