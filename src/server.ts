import app from './app';

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.listen(PORT, () => console.log(`Running at on port ${PORT}`));
