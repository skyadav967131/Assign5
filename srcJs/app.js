"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = express_1.default();
app.set('view engine', 'ejs');
app.use(express_1.default.static(path_1.default.join(__dirname, "../logic")));
var jsonData;
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/read', (req, res) => {
    fs_1.default.readFile('users.json', 'utf-8', (err, content) => {
        if (err) {
            console.log(err);
        }
        else {
            jsonData = JSON.parse(content);
            console.log(jsonData);
        }
    });
    res.render('read', { Data: jsonData });
});
app.listen(5000, () => console.log('server running'));
