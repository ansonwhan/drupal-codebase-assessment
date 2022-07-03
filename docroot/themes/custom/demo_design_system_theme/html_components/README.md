# Environment configuration - Otsuka Components Storybook

In the `html_components` folder there are twig components compiled with `gruntfile.js` into html complete file containing the component.
The html component can be checked on the browser side, e.g. `basic-form.html`.

We also have the option to verify the components in a complete storybook - `storybook.html`

## Getting Started
You should already have `gulpfile.js` set up at this stage.
1. Install https://www.npmjs.com/package/grunt-twig-render (npm plugin need for compiling .twig files)
2. To compile `.twig` files into` .html `files, use the` grunt twigRender` command. Please notice that you have to be in a folder where `gruntfile.js` is placed.

  **Please notice :
   Dependencies `.js and .scss` are declared in folders: for js `\otsk-sandboxes\themes\custom\demo_design_system_theme\assets\src\js\component` and for scss `\otsk-sandboxes\themes\custom\demo_design_system_theme\assets\src\style\component`. If gulp is working properly it should "listen" for changes in these folders. The rendered views on browser side use js and css compiled by `gulp` (from `build` folder).
### Directory structure (inside html_components folder)

```
 gruntfile.js
 gulp.config.js
 gulpfile.js
 html_components
  ├─ components.html
  ├─┬ temp
  │ └── img
  │ └── video
  ├── twig
   └── base-twig-components-templates.twig
   └── json
   └── layouts
   └── partial
       └── layouts_parts
```

#### components.html
Html Components generated with the gruntfile.js script. Please notice to use grunt script you need to add the dependency: https://www.npmjs.com/package/grunt-twig-render

#### temp
Temporary files like .jpg, .png, .mp4. They do not play a significant role on the implementation side of a given component, they are used for presentation purposes. The paths to these files are used in the `json` folder.

#### twig
 * **base-twig-components-templates.twig**
  The `.twig` files compiled by the script `gruntfile.js`, they are templates layouts that contain the dependency `{% include 'something'%}`, e.g ` twig/partial` elements that they are injected into them. The namespace is uniform for every file, whether it's `.twig, .html, .js, .scss` (every component and its dependencies have the same filenames)

 * **json**
 Data sources used by the `gruntfile.js` script, helpful in generating multiple html elements in loops, text, or other repetitive elements.

 * **layouts**
 Apart from single components, there are layouts that consist of many smaller components. We put them in this folder.

 * **partial**
 The components it consists of `base-twig-components-templates.twig`, usually each file is responsible for one component. So that you can freely create layouts from them.

    * └──  **layouts_parts**
         <br>Layout elements that are not standalone components but function as parts of larger layouts


###Configuration of paths in `localhost` env.

1. First of all please take a look at `gulp.config.default.js` define yours localhost paths and change this example file to `gulp.config.js` (exported variable it's used in `gulpfile.js`).

2. We are using `gruntfile.config.js` as default configuration which includes paths to js/css for our localhosts. If necessary define your own path for the `localPathToDependencies` variable (defined inside `gruntfile.config.js`).

2. To properly render components views on the browser side using localhost, in the `html_components` module, the `basePath` variable was declared, which uses the configuration from the` paths-to-dependencies.default.json` file. It is responsible for dependencies such as `.js, .css`.
   Also please notice when regenerating `.twig` files with` .gruntfile` remember that the value of the boolean variable` isDockerLocalHost` must be set to `true`.


###Good to know
If you want to add a new prototype also to the complete storybook (`storybook.html`). Add dependencies to `storybook.scss` and` storybook.twig` (you need to add link to dependency - `js` and to array variable `prototypesData` containing paths to `.twig` partial elements).

<br>
<br>
<br>
<br>
<br>
<br>

If you have some doubts feel free to ping, I'll be happy to consult with you. My nick name on EPAM `Teams` communicator  - `Maciej Dojlido` :)
