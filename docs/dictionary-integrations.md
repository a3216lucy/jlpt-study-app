# Dictionary Integrations

This project now includes three integration building blocks:

1. `Jisho` proxy access for Angular during local development
2. `Kanji Alive` Angular service/config scaffold
3. `JMdict XML -> quiz JSON` generation workflow

## Jisho Proxy

Files:

- `tools/jisho-proxy.mjs`
- `proxy.conf.json`
- `src/app/features/services/api/jisho-proxy.service.ts`
- `src/app/features/models/jisho.model.ts`

Run the local proxy in one terminal:

```bash
npm run proxy:jisho
```

Run Angular in another terminal:

```bash
npm start
```

Angular can then call:

- `JishoProxyService.searchWords('学校')`

The service talks to `/api/jisho/search?keyword=...`, and the local Node proxy forwards the request to:

- `https://jisho.org/api/v1/search/words`

Notes:

- This is intended as a dev-friendly proxy pattern.
- Jisho is not an official public product API with SLA guarantees, so treat it as best-effort.
- If you later deploy a backend, move the proxy there.

Reference used:

- unofficial Jisho API docs: https://mistval.github.io/unofficial-jisho-api/API.html

## Kanji Alive

Files:

- `src/app/features/services/api/kanji-alive.service.ts`
- `src/app/features/models/kanji-alive.model.ts`
- `src/app/features/services/api/dictionary-api.tokens.ts`

The service is configurable via the `KANJI_ALIVE_API_CONFIG` injection token.

Default config:

- `baseUrl`: `https://app.kanjialive.com/api/public`
- `searchPath`: `/search/{query}`
- `detailPath`: `/kanji/{character}`

Why configurable:

- Kanji Alive documents that a free public API exists, but endpoint and auth details can evolve.
- This scaffold keeps the Angular integration ready while letting you override the exact endpoint/header strategy in one place.

Example override in `app.config.ts`:

```ts
{
  provide: KANJI_ALIVE_API_CONFIG,
  useValue: {
    baseUrl: 'https://app.kanjialive.com/api/public',
    apiKey: '<your-key>',
    apiKeyHeader: 'X-API-KEY',
    searchPath: '/search/{query}',
    detailPath: '/kanji/{character}',
  },
}
```

Primary sources:

- Kanji Alive overview: https://kanjialive.com/
- Open data/media repo: https://github.com/kanjialive/kanji-data-media

## JMdict -> Quiz JSON

Files:

- `tools/generate-jmdict-quiz-json.mjs`

JMdict itself does not provide a clean built-in JLPT level field for quiz generation, so the workflow is:

1. Download the latest JMdict XML from EDRDG.
2. Prepare a small assignment TSV with:
   `term<TAB>level`
3. Generate one output file per JLPT level.

Example TSV:

```tsv
食べる	N5
学校	N5
新聞	N4
```

Example commands:

```bash
npm run build:jmdict -- \
  --input downloads/JMdict_e.xml \
  --assignments data/jlpt-assignments.tsv \
  --level N5 \
  --output src/assets/data/n5.json
```

The generated JSON matches the app's `VocabWord` shape:

- `id`
- `kanji`
- `furigana`
- `meaning`
- `level`
- `type`
- `sentences`

Current limitations:

- The script intentionally uses a lightweight parser to avoid extra dependencies.
- It extracts the first main writing, first reading, and first gloss.
- Example sentences are left empty; you can enrich them later from another corpus.

Primary source:

- JMdict project page: https://www.edrdg.org/jmdict/j_jmdict.html
