# Development Guide

This repository uses `pnpm` and `nx` as its build system. Unless mentioned, all
commands assume your working directory to be the project root.

To install dependencies: `pnpm i` and `for s in core adapter; do pnpm i -C packages/$d; done`

To build: `npx nx build {core,adapter}`

To test locally via Verdaccio:

1. Run a local npm registry: `nx local-registry`. By default it touches the
   `.npmrc` in your home directory.
2. Publish the package like below. It can be installed elsewhere pointing to
   this local directory.
3. If you have fetched dependencies at least once, the package metadata may
   linger in the cache and publishing may fail with `409 Conflict`. The solution
   is to `pnpm unpublish PKG@VERSION` it first.
4. When you stop Verdaccio, it erases the change in npmrc. It is a good idea to
   check it twice.

# Publishing

Make sure the repository is clean and use `nx` to publish:

1. Bump the version of the package you would like to publish.
2. Run the build command.
3. Run `nx run PKG:nx-release-publish` where `PKG` is the specific package. \
   **FIXME**: Running `nx-release-publish` directly [is not recommended](https://nx.dev/nx-api/js/executors/release-publish).
