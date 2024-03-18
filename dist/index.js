"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./app/modules/features/auth/routes/auth.routes"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (_, res) => {
    res.send('Hello World!');
});
app.use('/auth', auth_routes_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map