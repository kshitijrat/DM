const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const axios = require("axios");

const port = new SerialPort({
  path: "COM4", // apne Arduino ka COM port daalein
  baudRate: 9600,
});

port.on("open", () => {
  console.log("Serial Port Opened!");
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
console.log("parser cross kiya")
parser.on("data", async (line) => {
  try {
    console.log("yaha aaya");
    const data = JSON.parse(line.trim());
    console.log("📟 From Arduino:", data);

    // Backend URL change kar lena apne render backend ka
    await axios.post("http://localhost:5000/api/sensor-data", data);
  } catch (err) {
    console.error("Invalid data or POST error:", err.message);
  }
});
