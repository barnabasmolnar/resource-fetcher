# A simple library development environment and workflow

This project proposes a workflow and sets up a basic environment for an npm module/library development.

Let's make a couple of assumptions:
- we want to develop a **React** package that we later wish to push to npm
- we want to have the `library` itself and a `demo/example` in the same git repository
- we want to work on our component(s) in isolation but still have them available for testing and for demo purposes during development

The workflow proposed here satisfies these requirements in the following way:

We have a `src` and `demo` folder. The src folder has our module/library and it is in essence a completely separate package with its very own `package.json`. In this file we specify what exactly we will want to push to npm when it comes to that. This is done by the following entry:

```json
"files": [
    "/build"
]
```

So only our `build` folder (and some other mandatory files automatically included by npm) will be pushed to the npm repository. The `build` folder contains our *transpiled*, *bundled*, *minified* and *optimised* package.

The `demo` folder contains our React demo app which is bootstrapped by `create react app`.

## Development workflow

The aim is to develop the package **locally** and **in isolation** and to have a demo app that we can test it with.

This is achieved quite simply by specifying the package as a local dependency in the demo app:

```json
"dependencies": {
    ...,
    "our-package-name": "file:../src"
},
```

In this way, we have a *local link* between our package and our demo app.

Thus, the **development process** is fairly simple:

- cd into `src`
- `npm install`
- `npm run build` or `npm run dev` (the only difference is that `npm run dev` starts webpack with the watch flag)
- open a new terminal window/tab
- cd into `demo`
- `npm install`
- `npm start`

And that's basically it. The package can be imported into the demo app as any other package from npm. See the demo app for a concrete example.

### A note regarding dependencies
Generally speaking, dependencies can be installed in much the same way as if one were developing an app instead of a standalone package. The example provided here has `axios` as a dependency. This was installed in the src folder with a simple `npm i -S axios`.

There is a caveat, however. Any dependencies installed in this way will be bundled with our package. That leads to a somewhat bigger bundle size, quite obviously. And if the end-user of the package were to install his own version of `axios` in his app, the app would have 2 versions of axios for all intents and purposes.

If this is not desirable, we can specify these dependencies as `peerDependencies`. The consumer (the application in which our package is installed) would have to have these dependencies installed so that our package can work. Peer dependencies are not installed automatically when you run `npm install` but it does give you a heads up that there are certain peer dependency requirements not met. **It would be best to document these requirements explicitly and provide any necessary instructions.**

Alternatively, we may opt to bundle certain dependencies with our package (for instance, the React guys advise package authors to include `prop-types` in the bundle) and specify others as mere `peerDependencies`.

This example uses the above approach. React itself is specified as a peer dependency, while axios is bundled with the package.

I propose that larger dependencies and, more importantly, ones that have certain license constraints be specified as peer dependencies, while others may be safely bundled with a package.

So, for instance, if we were to create a React based component-library/wrapper around the [xeokit-sdk](https://github.com/xeokit/xeokit-sdk), we should probably declare it as a peer dependency and instruct end-users of our package to grab a copy of the sdk for themselves. In this way, we do not bundle the sdk with our package and as such we don't end up redistributing it, which may well be prohibited by the license.