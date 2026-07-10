const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
require("./Helpers/init_mongoDb");
const app = express();
const allowedOrigins = [
  "http://localhost:3080",
  "https://mumzo.in",
  "https://www.mumzo.in",
  "https://green-herring-760228.hostingersite.com",
];
const server = http.createServer(app);
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ProductRoute = require('./Routes/ProductsRoutes');
const InventoryRoute = require('./Routes/InventoryRoutes');
const CategoryRoute = require('./Routes/CategoriesRoutes');
const AuthRoutes = require("./Routes/AuthRoutes");
const CartRoutes = require("./Routes/AddToCartRoutes");
const AddressRoutes = require("./Routes/AddressRoutes");

app.use("/auth", AuthRoutes);
app.use('/products', ProductRoute);
app.use('/inventory', InventoryRoute);
app.use('/category', CategoryRoute);
app.use('/cart', CartRoutes);
app.use('/address', AddressRoutes);

server.listen(3000, () => {
    console.log("server is running ");
})
