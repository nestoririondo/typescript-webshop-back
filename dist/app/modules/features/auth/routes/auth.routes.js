"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Define your routes here
router.post('/login', (req, res) => {
    res.send('Login route');
});
router.post('/register', (req, res) => {
    res.send('Register route');
});
// Export the router
exports.default = router;
//# sourceMappingURL=auth.routes.js.map