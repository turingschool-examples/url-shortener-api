const express = require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 3001);
app.use(express.json());
app.use(cors());

app.locals.urls = [
  {
    id: 1,
    long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
    short_url: 'http://localhost:3001/useshorturl/1',
    title: 'Awesome photo'
  }
];

app.get('/', (request, response) => {
  return response.status(200).json({ hello: 'world', url: 'shortener' });
});


// Get all shortened urls
app.get('/api/v1/urls', (request, response) => {
  return response.status(200).json({ urls: app.locals.urls });
});


// Add an url
app.post('/api/v1/urls', (request, response) => {
  const newURL = request.body;
  const requiredParams = ['long_url', 'title'];
  let missingParams = [];

  for (let requiredProperty of requiredParams) {
    if (newURL[requiredProperty] === undefined) {
      missingParams = [...missingParams, requiredProperty];
    }
  }

  if (missingParams.length) {
    return response.status(422).send({ message: `Missing ${missingParams.join(', ')} in request.` });
  } else {
    newURL.id = app.locals.urls.length === 0 ? 1 : app.locals.urls[app.locals.urls.length - 1].id + 1;
    newURL.short_url = `http://localhost:3001/useshorturl/${newURL.id}`
    app.locals.urls.push(newURL);
    return response.status(201).json(newURL);
  }
});


// Remove a url
app.delete('/api/v1/urls/:url_id', (request, response) => {
  const urlId = parseInt(request.params.url_id);

  const numURLsBeforeFilter = app.locals.urls.length;
  const filteredURLs = app.locals.urls.filter(url => {
    return urlId !== url.id;
  });

  if (numURLsBeforeFilter === filteredURLs.length) {
    return response.status(404).json({ message: `No order found with id: ${urlId}` });
  } else {
    app.locals.urls = filteredURLs;
    return response.sendStatus(204);
  }
});

// Redirect a url
app.get('/useshorturl/:url_id', (request, response) => {
  const urlId = parseInt(request.params.url_id);

  const shortURL = app.locals.urls.find(url => urlId === url.id);

  if (shortURL) {
    return response.redirect(302, shortURL.long_url);
  } else {
    return response.status(404).json({ message: `No url found with id: ${urlId}` });
  }
});

app.listen(app.get('port'), () => {
  console.log(`URL Shortener API running on http://localhost:${app.get('port')}`);
});
