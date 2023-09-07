import fs from "fs/promises";
import path from "path";
import { Command } from "commander";
import { getAllTasks } from "../../helpers/helpers.js";
import TaskAPI from "../../../../common/api.js";

const exportCommand = new Command()
    .name("export")
    .description("Export and save a task into a json file")
    .option("-d --directory <dir>", "Specify the export directory")
    .action(async (options) => {
        try {
            const selectedTask = await getAllTasks("export");
            const task = await TaskAPI.getTask(selectedTask);
            if (!task) {
                console.log("Task not found.");
                return;
            }

            const exportDir = options.directory || ".";
            const fileName = path.join(exportDir, `${task.task.slice(0, 10).replace(/[^\w]/g, "")}.json`);
            await fs.writeFile(fileName, JSON.stringify(task, null, 2));

            console.log(`Task exported to ${fileName}`);
        } catch (error) {
            console.error(error.message);
        }
    });

export default exportCommand;