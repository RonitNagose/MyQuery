const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env");

// Read .env only if the file exists
if (fs.existsSync(envPath)) {
   const envFile = fs.readFileSync(envPath, "utf8");
   const envLines = envFile.split("\n");

   for (let line of envLines) {
      const trimmedLine = line.trim();

      // Ignore empty lines and comment lines
      if (!trimmedLine || trimmedLine.startsWith("#")) {
         continue;
      }

      const equalIndex = trimmedLine.indexOf("=");

      if (equalIndex === -1) {
         continue;
      }

      const key = trimmedLine.slice(0, equalIndex).trim();
      const value = trimmedLine.slice(equalIndex + 1).trim();

      // Do not overwrite an env variable if it is already set
      if (!process.env[key]) {
         process.env[key] = value;
      }
   }
}
