# URL Shortener API

This API is used in conjunction with the URL Shortener Front End. It stores original and shortened URLs that people want saved!

## Setup

* Clone down this repo and run `npm install`
* Run the server by using `npm start`

The server will run on `http://localhost:3001`.

## Data Model

A URL stored on the server has an `id`, `long_url`, and `short_url`. Here is a sample URL object:

```js
{
  id: 1,
  long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
  short_url: 'http://localhost:3001/useshorturl/1'
}
```

The **long_url** is the original long format URL. The **short_url** is the shorted version of the `long_url`. The **id** is a unique identifier for that URL (it is also used to make the `short_url`).

## Endpoints

| Purpose | URL | Verb | Request Body | Sample Success Response |
|----|----|----|----|----|
| Get all urls |`/api/v1/urls`| GET | N/A | All urls on the server: `{urls: [{}, {}, ...]}` |
| Add new url |`/api/v1/urls`| POST | `{long_url: <String>}` | New url that was added: `{id: 2, long_url: "https://images.unsplash.com/photo...", short_url: "http://localhost:3001/useshorturl/2"}` |
| Delete existing url |`/api/v1/urls/:url_id`| DELETE | N/A | For successful deletion: No response body (only 204 status code) |
