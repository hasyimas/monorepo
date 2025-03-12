import express from "express";
import userRoutes from "../routes/userRoutes";
import cors from "cors";

const app = express();
const allowedOrigins = true;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// Then pass these options to cors:
app.use(cors(options));
app.use(express.json());
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
