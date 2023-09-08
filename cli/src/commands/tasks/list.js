import { Command } from "commander";
import chalk from "chalk";
import Table from "cli-table";
import day from "dayjs";
import { formatDueDate } from "../../helpers/helpers.js";
import TaskAPI from "../../../../common/api.js";

const listCommand = new Command()
    .name("list")
    .description("Get all tasks")
    .action(async () => {
        try {
            let count = 1;

            const tasks = await TaskAPI.getTasks();

            if (tasks.length === 0) {
                console.log(":-( You haven't made any tasks.");
                return;
            }

            const table = new Table({
                head: [chalk.cyan("ID"), chalk.cyan("Completed"), chalk.cyan("Due"), chalk.cyan("Priority"), chalk.cyan("Task")],
                colWidths: [4, 10, 14, 8, 30],
                chars: {
                    "top": "", "top-mid": "", "top-left": "", "top-right": "",
                    "bottom": "", "bottom-mid": "", "bottom-left": "", "bottom-right": "",
                    "left": "", "left-mid": "", "mid": "", "mid-mid": "",
                    "right": "", "right-mid": "", "middle": " ",
                },
                style: { "padding-left": 0, "padding-right": 0, "compact": true },
            });

            for (const task of tasks) {
                const completed = task.completed ? chalk.green("[✔]") : "[ ]";
                const dueDate = task.dueDate ? formatDueDate(task.dueDate) : " ";
                const taskId = chalk.cyan(count++);
                const taskName = task.archived ? chalk.gray(`[archived] ${task.task}`) : task.task;

                const currentDate = day();
                let dueDateMsg = dueDate;

                if (task.dueDate) {
                    const dueDateValue = day(task.dueDate);
                    const daysUntilDue = dueDateValue.diff(currentDate, "day");

                    if (daysUntilDue === 0) {
                        if (task.completed) {
                            dueDateMsg = chalk.red("Today");
                        } else {
                            dueDateMsg = chalk.yellow("Today");
                        }
                    } else if (daysUntilDue === 1) {
                        dueDateMsg = chalk.yellow("Tomorrow");
                    } else if (daysUntilDue < 0) {
                        dueDateMsg = chalk.red(dueDate);
                    }
                }

                const priority = {
                    low: chalk.cyan("low"),
                    medium: chalk.yellow("med"),
                    high: chalk.red("high"),
                }[task.priority] || chalk.gray("N/A");

                table.push([taskId, completed, dueDateMsg, priority, taskName]);
            }

            console.log(table.toString());
        } catch (error) {
            console.error(error.message);
        }
    });

export default listCommand;