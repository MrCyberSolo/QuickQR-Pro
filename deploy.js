const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  buildDir: path.join(__dirname, 'build'),
  serverFile: path.join(__dirname, 'src', 'api', 'server.js'),
  packageJson: path.join(__dirname, 'package.json'),
  nodeModules: path.join(__dirname, 'node_modules'),
  deployFiles: [
    'src/api',
    'src/data',
    'public',
    'package.json',
    'package-lock.json'
  ]
};

console.log('Starting deployment process...');

// Create build directory if it doesn't exist
if (!fs.existsSync(config.buildDir)) {
  console.log('Creating build directory...');
  fs.mkdirSync(config.buildDir, { recursive: true });
}

// Copy necessary files to build directory
console.log('Copying files to build directory...');
config.deployFiles.forEach(file => {
  const sourcePath = path.join(__dirname, file);
  const destPath = path.join(config.buildDir, file);
  
  // Create directory if it doesn't exist
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // If it's a directory, use recursive copy
  if (fs.statSync(sourcePath).isDirectory()) {
    copyDir(sourcePath, destPath);
  } else {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${file}`);
  }
});

// Create a simplified package.json for deployment
console.log('Creating deployment package.json...');
const packageJson = JSON.parse(fs.readFileSync(config.packageJson, 'utf8'));
const deployPackageJson = {
  name: packageJson.name + '-api',
  version: packageJson.version,
  description: 'API server for ' + packageJson.name,
  main: 'src/api/server.js',
  scripts: {
    start: 'node src/api/server.js'
  },
  dependencies: packageJson.dependencies,
  engines: {
    node: '>=14.0.0'
  }
};

fs.writeFileSync(
  path.join(config.buildDir, 'package.json'),
  JSON.stringify(deployPackageJson, null, 2)
);

console.log('Deployment package prepared successfully!');
console.log('\nTo deploy your API server:');
console.log('1. Upload the contents of the "build" directory to your hosting provider');
console.log('2. Install dependencies with "npm install --production"');
console.log('3. Start the server with "npm start" or using a process manager like PM2');
console.log('\nFor hosting on platforms like Heroku or Vercel, follow their specific deployment guides.');

// Helper function to recursively copy a directory
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
