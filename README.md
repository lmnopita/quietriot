# quietriot

A calm, single-page tool for finding one evidence-grounded way to act in solidarity with people who face more risk.

It does not collect information, use accounts, cookies, analytics, or a server. The app is entirely static: it runs in the browser and makes no network requests.

## What it does

Choose a cause and Quietriot presents researched, clearly limited suggestions alongside the sources behind them. When the available evidence is applied from a similar situation rather than measured for that exact case, the app says so plainly.

The cited evidence and the record of how it was checked are available in [docs/EVIDENCE-VERIFICATION-LOG.md](docs/EVIDENCE-VERIFICATION-LOG.md). Source citations are also included in the app data at [src/data/evidence.json](src/data/evidence.json).

## Run it locally

```sh
npm install
npm run dev
```

To prepare a production build:

```sh
npm run build
```

## Verify a citation

```sh
node scripts/verify-citation.mjs 10.1177/0149206305277800
```

## Contributing

If a source is wrong, missing, or stretched further than it should be, email [quietriot@lilyweb.dev](mailto:quietriot@lilyweb.dev).

## License

- Code: [MIT](LICENSE)
- Evidence corpus and verification record: [CC BY-SA 4.0](LICENSE-CONTENT)

The underlying studies belong to their publishers and are cited in full so readers can visit the original sources.
