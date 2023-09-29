const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocs = yaml.load("./swagger.yaml");
const dbConnection = require("./database/connection");
const cookieParser = require("cookie-parser");

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 3520;

// Connect to the database
dbConnection();

// Handle CORS issues
//"https://argent-bank-mzi.netlify.app",
const corsOptions = {
  origin: "https://argent-bank-mzi.netlify.app",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());

// Request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle custom routesd
app.use("/api/v1/refresh", require("./routes/refreshRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/bank", require("./routes/accountRoutes"));
app.use("/api/v1/panel", require("./routes/bankerRoutes"));

// API Documentation
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

app.get("/", (req, res, next) => {
  res.send("Hello from my Express server v2!");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
