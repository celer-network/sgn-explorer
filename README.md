# SGN explorer

Explorer web UI for the Celer State Guardian Network (SGN)

## Deployment

1. Install dependencies:

```sh
npm install
```

2. Build the web UI:

```sh
SKIP_PREFLIGHT_CHECK=true npm run build:<network>
```

3. Push the UI to a deployment branch:

```sh
npm run deploy:<network>
```

4. On the deployment machine, update the local deployment branch:

```sh
git checkout deploy-<network>
git pull
```

5. Start a Node HTTP server:

```sh
http-server --port 80
```
