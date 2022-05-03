"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(cors());
// const qs = require('qs')
// const axios = require('axios')
// Routes
app.use('/api', require('./routes'));
app.listen(port, () => {
    // console.log(`Example app listening on port ${port}`)
});
module.exports = app;
