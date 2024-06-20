const fastify = require('fastify')({ logger: true });
const fs = require('fs');
const path = require('path');
const cors = require("@fastify/cors");

fastify.register(cors, {
    origin: 'http://192.168.0.142:3002',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.register(require('@fastify/multipart'));

fastify.post('/Capture', async (request, reply) => {
    const { image } = request.body;
    const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");

    if (!fs.existsSync(path.join(__dirname, 'image'))) {
        fs.mkdirSync(path.join(__dirname, 'image'));
    }

    try{
        const imagePath = path.join(__dirname, 'image', `images-${Date.now()}.jpg`);
        fs.writeFileSync(imagePath, base64Data, 'base64');
        reply.status(200).send({ image: image });
    }catch(err){
        reply.status(500).send({ error: 'Gagal menyimpan gambar' });
    }
});

fastify.post('/Record', async (request, reply) => {
const parts = await request.parts();

if (!fs.existsSync(path.join(__dirname, 'video'))) {
    fs.mkdirSync(path.join(__dirname, 'video'));
}

  for await (const part of parts) {
    if (part.file) {
      const filename = `video-${Date.now()}.webm`;
      const filepath = path.join(__dirname, 'video', filename);
      await part.file.pipe(fs.createWriteStream(filepath));
      reply.send({ message: 'File uploaded successfully' });
    }
  }
})

const start = async () => {
    try {
        await fastify.listen({
            port: 5002,
            host: '192.168.0.142'
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();