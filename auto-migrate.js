const { exec } = require('child_process');
const chokidar = require('chokidar');

const modelDir = 'models';

const watcher = chokidar.watch(modelDir, { ignoreInitial: true, ignored: /node_modules/ });

watcher.on('all', (event, path) => {
  console.log(`Model file changed (${event}): ${path}`);
  if (event === 'change') {
    const modelName = getModelNameFromPath(path); // Extract the model name from the changed file
    if (modelName) {
      console.log(`Running migrations for ${modelName}...`);
      const generateMigrationProcess = exec(`npx sequelize-cli migration:generate --name update${modelName}`);
      generateMigrationProcess.on('exit', (generateExitCode) => {
        if (generateExitCode === 0) {
          const migrateProcess = exec('npx sequelize-cli db:migrate');
          migrateProcess.on('exit', (migrateExitCode) => {
            if (migrateExitCode === 0) {
              console.log(`Migrations for ${modelName} completed successfully.`);
            } else {
              console.error(`Error running migrations for ${modelName}.`);
              console.error(generateExitCode);
            }
          });
        } else {
          console.error(`Error generating migration for ${modelName}.`);
        }
      });
    }
  }
});

console.log(`Watching ${modelDir} directory for changes...`);

function getModelNameFromPath(filePath) {
  // Extract the model name from the file path
  const fileName = filePath.split('\\').pop(); 
  const modelName = fileName.split('.')[0];
  return modelName;
}

