import { createServer } from 'node:http';
import { URL } from 'node:url';

const port = Number(process.env.JISHO_PROXY_PORT ?? 8787);
const upstream = process.env.JISHO_UPSTREAM ?? 'https://jisho.org/api/v1/search/words';

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
  });
  response.end(JSON.stringify(payload));
}

const server = createServer(async (request, response) => {
  if (!request.url || !request.method) {
    sendJson(response, 400, { error: 'Invalid request.' });
    return;
  }

  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    response.end();
    return;
  }

  const url = new URL(request.url, `http://localhost:${port}`);

  if (url.pathname === '/health') {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method !== 'GET' || url.pathname !== '/api/jisho/search') {
    sendJson(response, 404, { error: 'Route not found.' });
    return;
  }

  const keyword = url.searchParams.get('keyword')?.trim();

  if (!keyword) {
    sendJson(response, 400, { error: 'Missing query parameter: keyword' });
    return;
  }

  try {
    const upstreamUrl = new URL(upstream);
    upstreamUrl.searchParams.set('keyword', keyword);

    const upstreamResponse = await fetch(upstreamUrl, {
      headers: {
        'User-Agent': 'jlpt-app-jisho-proxy/1.0',
        Accept: 'application/json',
      },
    });

    const bodyText = await upstreamResponse.text();

    response.writeHead(upstreamResponse.status, {
      'Content-Type': upstreamResponse.headers.get('content-type') ?? 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
    });
    response.end(bodyText);
  } catch (error) {
    sendJson(response, 502, {
      error: 'Failed to reach Jisho upstream.',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
});

server.listen(port, () => {
  console.log(`Jisho proxy listening on http://localhost:${port}`);
});
