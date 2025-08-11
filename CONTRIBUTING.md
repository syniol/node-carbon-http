# Publishing NPM
GitHub Workflows are configured to trigger on a new tag push on git. Please follow the steps to publish the NPM Package.

1. Increment the `version` inside the `package.json` to match your new tag and run `npm i` to update `package-lock.json` with a new version
2. Push all your changes to the `main` branch.
3. git tag v1.x.x
4. git push origin v1.x.x
