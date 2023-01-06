#! /usr/bin/env node

import { execSync } from "child_process";
import { existsSync } from "fs";

const MY_PACKAGE_LIST = ["react-webpack-ts", "react-vite-ts"];
const EXIT = () => process.exit(1);

const printPackage = () => {
  console.log("package list :");
  MY_PACKAGE_LIST.forEach((PACKAGE_NAME, idx) =>
    console.log(`    ${idx + 1}. ${PACKAGE_NAME}`)
  )
}

const printExample = () => {
  console.log("For example :");
  console.log("    npx ktmihs-bp react-webpack-ts my-app");
}

if (process.argv.length < 3) {
  console.log("You have to provide a selected package's name.");

  printPackage();
  printExample();
  EXIT();
}

if (process.argv.length < 4) {
  console.log("You have to provide a name to your app.");

  printExample();
  EXIT();
}

const PACKAGE_NAME = process.argv[2];
const PROJECT_NAME = process.argv[3];
const GIT_REPO = 'https://github.com/ktmihs/boilerplate';

if (!MY_PACKAGE_LIST.includes(PACKAGE_NAME)) {
  console.log(`The package ${PACKAGE_NAME} doesn't exist.`);
  console.log(`You can download this packages.`);

  printPackage();
  EXIT();
}

(async () => {
  try {
    const isExistProject = existsSync(PROJECT_NAME);
    const isExistModules = existsSync('./node_modules');

    if (isExistProject) {
      console.log(
        `The file ${PROJECT_NAME} already exist in the current directory, please give it another name.`
      );

      EXIT();
    }

    console.log("Downloading files...");
    execSync(`npm i degit`);
    execSync(`degit ${GIT_REPO}/${PACKAGE_NAME}#${PACKAGE_NAME} ${PROJECT_NAME}`);
    execSync("npm uninstall degit");

    if (!isExistModules) {
      execSync("npx rimraf node_modules");
      execSync("npx rimraf package-lock.json");
    }

    console.log("\nInstalling dependencies...");
    process.chdir(PROJECT_NAME);
    execSync("npm install");

    console.log("\nRemoving useless files ✂");
    execSync("npx rimraf ../.git");

    console.log("\n\n🐰 The installation is done! 🐰\n");
  } catch (error) {
    console.log(error);
  }
})();