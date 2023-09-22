import server from './app';

const PORT = process.env.PORT || 3200;

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});