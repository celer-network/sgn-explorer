# SGN explorer

Explorer web UI for the Celer State Guardian Network (SGN)

## Deployment

1. Install dependencies:

```sh
npm install
```

2. Build the web UI:

```sh
SKIP_PREFLIGHT_CHECK=true npm run build
```

3. Push the UI to the `gh-pages` branch:

```sh
npm run deploy
```

4. Update the local `gh-pages` branch:

```sh
cd ..
git checkout gh-pages
git pull
```

5. Start a Node HTTP server:

```sh
http-server --port 80
```
