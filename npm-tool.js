const path = require("path");
const { createConfig } = require("@banez/npm-tool");
const { ChildProcess } = require("@banez/child_process");
const { createFS } = require("@banez/fs");

const fs = createFS({
  base: process.cwd(),
});

const projects = [
  "agency",
  "blog",
  "conference",
  "e-commerce",
  "job-board",
  "personal",
  "podcast",
  "recipes",
  "restaurant",
];

module.exports = createConfig({
  custom: {
    "--update-cms": async () => {
      await ChildProcess.spawn("bcms", [
        "--cms",
        "create",
        "--project-name",
        "cms-temp",
      ]);
      await fs.save(
        ["cms-temp", ".gitignore"],
        (await fs.readString(["cms-temp", ".gitignore"]))
          .replace("/uploads\n", "/uploads/6*\n")
          .replace(/\/db/, "")
          .replace(/\/db/, "")
      );
      for (let i = 0; i < projects.length; i++) {
        const projectName = projects[i];
        console.log("Working on:", projectName);
        await fs.deleteDir(["cms-temp", "db"]);
        await fs.deleteDir(["cms-temp", "uploads"]);
        await fs.copy(["cms", projectName, "db"], ["cms-temp", "db"]);
        await fs.copy(["cms", projectName, "uploads"], ["cms-temp", "uploads"]);
        await fs.deleteDir(["cms", projectName]);
        await fs.copy("cms-temp", ["cms", projectName]);
        process.stdout.write(" - Done\n");
      }
      await fs.deleteDir("cms-temp");
    },

    "--update-nuxt-packages": async () => {
      const packages = [
        "@becomes/cms-cli@latest",
        "@becomes/cms-client@latest",
        "@becomes/cms-most@latest",
        "nuxt-plugin-bcms@latest",
      ];
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        await ChildProcess.spawn("npm", ["i", "-D", ...packages], {
          cwd: path.join(process.cwd(), "nuxt", project),
          stdio: "inherit",
        });
        await ChildProcess.spawn("npm", ["update"], {
          cwd: path.join(process.cwd(), "nuxt", project),
          stdio: "inherit",
        });
      }
    },

    "--dev-project": async ({ args }) => {
      console.log(args);
    },

    "--build-and-deploy": async ({ args }) => {
      const serverInfo = JSON.parse(await fs.readString("server-info.json"));
      const project = args["--project"];
      const framework = args["--framework"];
      if (framework === "nuxt") {
        await ChildProcess.spawn("npm", ["run", "generate"], {
          cwd: path.join(process.cwd(), framework, project),
          stdio: "inherit",
        });
        if (await fs.exist([framework, project, "bundle.zip"], true)) {
          await fs.deleteFile([framework, project, "bundle.zip"]);
        }
        await ChildProcess.advancedExec(
          `zip -r ${framework}/${project}/bundle.zip ${framework}/${project}/.output/public/*`,
          {
            onChunk(type, chunk) {
              process[type].write(chunk);
            },
          }
        ).awaiter;
        await ChildProcess.spawn("scp", [
          `${framework}/${project}/bundle.zip`,
          `${serverInfo.user}@${serverInfo.ip}:/home/${serverInfo.user}/bundle.zip`,
        ]);
        await ChildProcess.advancedExec(
          [
            "ssh",
            `${serverInfo.user}@${serverInfo.ip}`,
            `'cd /home/${serverInfo.user} && rm -rf ${framework}/${project}/.output && unzip bundle.zip && rm bundle.zip && chmod 755 -R nuxt'`,
          ],
          {
            onChunk(type, chunk) {
              process[type].write(chunk);
            },
          }
        ).awaiter;
      }
    },
  },
});
