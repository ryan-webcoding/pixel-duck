document
  .getElementById("csvInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      const rows = text
        .trim()
        .split("\n")
        .map((row) => row.split(",").map(Number));
      renderPixelArt(rows);
    };
    reader.readAsText(file);
  });

function renderPixelArt(data) {
  const canvas = document.getElementById("pixelCanvas");
  const ctx = canvas.getContext("2d");

  const cellSize = 20; // Size of each pixel
  const rows = data.length;
  const cols = data[0].length;

  canvas.width = cols * cellSize;
  canvas.height = rows * cellSize;

  const colorMap = {
    0: "#ffffff", // White for blank
    1: "#000000", // Black
    2: "#ffff00", // Yellow
    3: "#ffA500", // Orange
  };

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const color = colorMap[data[y][x]] || "#ffffff";
      ctx.fillStyle = color;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}
