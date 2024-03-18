import { Router, Request, Response } from 'express';

const router = Router();

// Define your routes here
router.post('/login', (req, res) => {
  res.send('Login route');
});

router.post('/register', (req: Request, res: Response) => {
  res.send('Register route');
});

// Export the router
export default router;
