import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/uniswap", async (req, res) => {
  const graphRes = await fetch(
    "https://gateway.thegraph.com/api/69fd7adc60944263f17777c0cff219b1/subgraphs/id/A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    }
  );

  const data = await graphRes.json();
  res.json(data);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
