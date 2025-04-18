const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const Grant = require('./models/Grant');
const KDA_URL = 'https://www.kyagr.com/grants/';

async function fetchAndSaveGrants() {
    await mongoose.connect(process.env.MONGO_URI);

    const { data } = await axios.get(KDA_URL);
    const $ = cheerio.load(data);

    const grants = [];

    $('.grant-programs .grant').each((i, el) => {
        const title = $(el).find('h3').text().trim();
        const description = $(el).find('p').first().text().trim();
        const source_url = $(el).find('a').attr('href');
        if (title) {
            grants.push({
                title,
                description,
                source_url: source_url?.startsWith('http') ? source_url : `https://www.kyagr.com${source_url}`,
            });
        }
    });

    await Grant.deleteMany(); // Optional: clear old data
    await Grant.insertMany(grants);
    console.log(`✅ Inserted ${grants.length} grants`);
    process.exit();
}

fetchAndSaveGrants().catch(console.error);

