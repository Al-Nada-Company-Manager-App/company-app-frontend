import fs from 'fs/promises';
import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const execAsync = promisify(exec);

const version = process.argv[2];
if (!version) {
  console.error("❌ Please provide a version number!");
  console.error("Usage: node release.mjs 1.4.0");
  process.exit(1);
}

// Ensure version format is valid x.y.z
if (!/^\d+\.\d+\.\d+$/.test(version)) {
  console.error("❌ Invalid version format. Please use a semantic version like 1.4.0");
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FRONTEND_DIR = __dirname;
const BACKEND_DIR = path.join(__dirname, '..', 'company-app-backend');

async function updateFrontend() {
  console.log(`\n📦 Updating Frontend to v${version}...`);
  const packagePath = path.join(FRONTEND_DIR, 'package.json');
  
  // Update package.json
  const pkgData = JSON.parse(await fs.readFile(packagePath, 'utf8'));
  pkgData.version = version;
  await fs.writeFile(packagePath, JSON.stringify(pkgData, null, 2));
  console.log("  ✅ package.json updated");

  // Update Android versionCode and versionName
  const buildGradlePath = path.join(FRONTEND_DIR, 'android', 'app', 'build.gradle');
  try {
    let gradleData = await fs.readFile(buildGradlePath, 'utf8');
    gradleData = gradleData.replace(/versionCode (\d+)/, (match, p1) => `versionCode ${parseInt(p1) + 1}`);
    gradleData = gradleData.replace(/versionName "[^"]+"/, `versionName "${version}"`);
    await fs.writeFile(buildGradlePath, gradleData);
    console.log("  ✅ android/app/build.gradle updated");
  } catch(e) {
    console.log("  ⚠️ Skipping android build.gradle (not found)");
  }

  // Git operations
  console.log("  🚀 Committing and pushing frontend changes...");
  await execAsync(`git add package.json android/app/build.gradle`, { cwd: FRONTEND_DIR });
  
  try {
    await execAsync(`git commit -m "chore: release v${version}"`, { cwd: FRONTEND_DIR });
  } catch(e) {
    // Ignore error if there are no changes to commit
  }
  
  await execAsync(`git tag v${version}`, { cwd: FRONTEND_DIR });
  await execAsync(`git push`, { cwd: FRONTEND_DIR });
  await execAsync(`git push origin v${version}`, { cwd: FRONTEND_DIR });
  console.log(`  🎉 Frontend GitHub Actions release v${version} triggered!`);
}

async function updateBackend() {
  console.log(`\n⚙️  Updating Backend to v${version}...`);
  const indexPath = path.join(BACKEND_DIR, 'index.js');
  
  // Update index.js
  let indexData = await fs.readFile(indexPath, 'utf8');
  
  // Update the /health version
  indexData = indexData.replace(
    /(name:\s*"company-manager-api",\s*version:\s*)"[^"]*"/g, 
    `$1"${version}"`
  );
  
  // Update the /app-version response
  indexData = indexData.replace(
    /(windows:\s*{[^}]*latest:\s*)"[^"]*"/g,
    `$1"${version}"`
  );
  indexData = indexData.replace(
    /(linux:\s*{[^}]*latest:\s*)"[^"]*"/g,
    `$1"${version}"`
  );
  indexData = indexData.replace(
    /(android:\s*{[^}]*latest:\s*)"[^"]*"/g,
    `$1"${version}"`
  );
  
  await fs.writeFile(indexPath, indexData);
  console.log("  ✅ index.js updated");

  // Git operations
  console.log("  🚀 Committing and pushing backend changes...");
  await execAsync(`git add index.js`, { cwd: BACKEND_DIR });
  
  try {
    await execAsync(`git commit -m "chore: release v${version}"`, { cwd: BACKEND_DIR });
  } catch(e) {
    // Ignore error if there are no changes to commit
  }
  
  await execAsync(`git push`, { cwd: BACKEND_DIR });
  console.log(`  🎉 Backend update v${version} pushed!`);
}

async function main() {
  try {
    console.log(`Starting automated release pipeline for v${version}...`);
    await updateFrontend();
    await updateBackend();
    console.log(`\n✨ RELEASE v${version} COMPLETED SUCCESSFULLY! ✨`);
    console.log(`\nYour GitHub Actions are now building the desktop and mobile apps in the cloud.`);
  } catch (err) {
    console.error("\n❌ Error during release:", err.message);
    if (err.stdout) console.error("Output:", err.stdout);
    if (err.stderr) console.error("Error output:", err.stderr);
    process.exit(1);
  }
}

main();
