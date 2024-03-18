const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/getAmounts", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.webflow.com/v2/collections/65f5c4206c7db01c7173f20f/items",
      {
        headers: {
          Authorization:
            "Bearer cc5d048b20458561d8f5a15c42c26cf537f4bc67075188b2b399dcaa7173cce7",
          "Content-Type": "application/json",
          // Add more headers as needed
        },
      }
    );
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
app.post("/api/setAmounts", async (req, res) => {
  try {
    const { totalAmount, currentAmount } = req.body;
    console.log(
      "🚀 ~ app.post ~ totalAmount, currentAmount:",
      totalAmount,
      currentAmount
    );
    const response = await axios.patch(
      "https://api.webflow.com/v2/collections/65f5c4206c7db01c7173f20f/items/65f5cadfaf79783925609d21",
      {
        fieldData: {
          "total-amount": totalAmount,
          "current-amount": currentAmount,
        },
      },
      {
        headers: {
          Authorization:
            "Bearer cc5d048b20458561d8f5a15c42c26cf537f4bc67075188b2b399dcaa7173cce7",
          "Content-Type": "application/json",
          // Add more headers as needed
        },
      }
    );
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
const port = 3003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
