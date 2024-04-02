import express from 'express';
import { engine } from 'express-handlebars';
import apiRouter from '../routes/api.js';
import getHighScores from './getHighScores.js';

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

app.use('/api', apiRouter);

const menu = [
  { name: 'Highscore', url: '/highscore' },
  { name: 'About project', url: '/aboutproject' },
];

async function renderPage(response, page, highScores) {
  response.render(page, {
    menuLink: menu.map((link) => {
      return {
        label: link.name,
        link: link.url,
      };
    }),
    highScores,
  });
}

app.get('/', async (request, response) => {
  renderPage(response, 'index');
});

app.get('/highscore', async (request, response) => {
  try {
    const highScores = await getHighScores();
    renderPage(response, 'highscore', highScores);
  } catch (error) {
    console.error('Error getting high scores:', error);
  }
});

app.get('/aboutproject', async (request, response) => {
  renderPage(response, 'aboutproject');
});

app.use('/static', express.static('./static'));

export default app;
