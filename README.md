# README

## About

This repository holds a prototype for an IDE for business rules.
This IDE can be run (from) anywhere in a modern browser.

Technically, it consists of only a SPA frontend, which relies on the browser's `localStorage`, and loading from/saving to a local file system.
This avoids needing to host a backend, including persistence, etc.
The reasoning behind this setup is that countries participating in the EU DCC and wanting to publish business rules have wildly differing development environments.
In addition, up- and downloading business rules to the EU DCC Gateway _can only_ be done from a National Backend which should have no outside access anyway.


## Building

Install the necessary dependencies (once) by running either

    yarn

or

    npm i

The [`build.sh`](./build.sh) builds the TypeScript source code (including ) in the [`src/` directory](./src/), and bundles it to the [`dist/` distribution directory](./dist/).
In particular, the `dist/index-local.html` can be opened locally, from file.
The other files can be served from a Web server.

Developing the application can be done conveniently using

    npx parcel src/index.html

That will start the SPA at URL [`http://localhost:1234/`](http://localhost:1234/).


## Licensing

Copyright (c) 2022 Dutch Ministry of Health, Science, and Sports, and all other contributors

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific
language governing permissions and limitations under the License.

