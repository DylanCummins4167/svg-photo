const readline = require('readline');
const fs = require('fs');
const { createCanvas } = require('canvas');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

async function createLogo() {
  // Prompt for text
  const text = await prompt("Enter up to three characters for the text: ");

  // Prompt for text color
  const textColor = await prompt("Enter the text color (keyword or hexadecimal number): ");

  // Prompt for shape
  console.log("Choose a shape:");
  console.log("1. Circle");
  console.log("2. Triangle");
  console.log("3. Square");
  const shapeChoice = parseInt(await prompt("Enter the number corresponding to the shape: "));

  let shape = '';
  if (shapeChoice === 1) {
    shape = 'circle';
  } else if (shapeChoice === 2) {
    shape = 'triangle';
  } else if (shapeChoice === 3) {
    shape = 'square';
  }

  // Prompt for shape color
  const shapeColor = await prompt("Enter the shape color (keyword or hexadecimal number): ");

  // Create SVG file
  const canvas = createCanvas(300, 200);
  const ctx = canvas.getContext('2d');

  // Draw shape
  if (shape === 'circle') {
    ctx.beginPath();
    ctx.arc(150, 100, 50, 0, Math.PI * 2);
    ctx.fillStyle = shapeColor;
    ctx.fill();
    ctx.closePath();
  } else if (shape === 'triangle') {
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 100);
    ctx.lineTo(150, 25);
    ctx.closePath();
    ctx.fillStyle = shapeColor;
    ctx.fill();
  } else if (shape === 'square') {
    ctx.fillStyle = shapeColor;
    ctx.fillRect(100, 50, 100, 100);
  }

  // Add text
  ctx.fillStyle = textColor;
  ctx.font = '20px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(text, 150, 125);

  // Save SVG file
  const svgData = canvas.toBuffer().toString('utf-8');
  fs.writeFileSync('logo.svg', svgData);

  console.log("Generated logo.svg");

  rl.close();
}

// Run the application
createLogo();
