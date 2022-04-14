# URL Shortener API

This API is used in conjunction with the URL Shortener Front End. It stores original and shortened URLs that people want saved!

## Setup

* Clone down this repo and run `npm install`
* Run the server by using `node server.js`

The server will run on `http://localhost:3001`.

## Data Model

A URL stored on the server has an `id`, `long_url`, `short_url`, and `title`. Here is a sample URL object:

```js
{
  id: 1,
  long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
  short_url: 'http://localhost:3001/useshorturl/1',
  title: 'Awesome photo'
}
```

The **long_url** is the original long format URL. The **short_url** is the shorted version of the `long_url`. The **id** is a unique identifier for that URL (it is also used to make the `short_url`).

The **title** is any title given by the user to label the url.

## Endpoints

Note - the POST request requires the header to be set: `Content-Type: "application/json"`

| Purpose | URL | Verb | Request Body | Sample Success Response |
|----|----|----|----|----|
| Get all saved urls |`/api/v1/urls`| GET | N/A | All urls on the server: `{urls: [{}, {}, ...]}` |
| Save a new url and get back a the shortened url |`/api/v1/urls`| POST | `{long_url: <String>, title: <String>}` | New url that was added with the shortened url: `{id: 2, long_url: "https://images.unsplash.com/photo...", short_url: "http://localhost:3001/useshorturl/2", title: 'Awesome photo'}` |
| Delete existing saved url |`/api/v1/urls/:url_id`| DELETE | N/A | For successful deletion: No response body (only 204 status code) |
