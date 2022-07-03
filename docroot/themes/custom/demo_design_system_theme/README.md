
# Otsuka Process

## Useful Links
- Link to Otsuka Storybook READ_ME.md https://github.com/OAPI-Commercial-IT/otsk-sandboxes/blob/theme-designsystem/themes/custom/demo_design_system_theme/html_components/README.md
- Dev Hosting environment GUI (Dan only): http://designsystem.dev-otsuka.acsitefactory.com/a/about-condition
- Theme url (demo_design_system_theme repo):  https://github.com/OAPI-Commercial-IT/otsk-sandboxes/tree/theme-designsystem/themes/custom/demo_design_system_theme
- Otsuka_Components+Patterns on InVision: https://epam.invisionapp.com/share/3KZJILMBWJR
- Otsuka_PageTemplates on InVision: https://epam.invisionapp.com/share/HGZCUCV5XQB

## Getting Started

1. Install [Node.js](https://nodejs.org/) on your computer, the author is using v.14.14.0. The build should work with with other versions of NodeJS < 15.  If you need to manage different versions of node for different projects look at using:
 * nvm (mac or linux) https://github.com/nvm-sh/nvm
 * n (mac) https://www.npmjs.com/package/n
 * nvm-windows (windows) https://github.com/coreybutler/nvm-windows

2. Install the theme's dependencies
```
$ npm install
```
3. Install Gulp CLI (if needed)
https://gulpjs.com/
```
npm install --global gulp-cli
```

4. Start watching for SCSS or JS changes
```
$ gulp watch
```
The start script command is also set to trigger the gulp watch
```
$ npm start
```
5. Start coding!


## Directory structure

```
project-theme
├─┬ assets
│ ├─ build
| └── css
| └── img
| └── js
│ ├── webp
├─┬ src
│ └── fonts
│ └── img
│ └── js
│ └── style
├── html_components
├── node_modules
├── templates
│ └── field
│ └── layout
│ └── navigation
│ └── node
```

### assets

The **assets** folder contains the **build** folder which contains all compiled assets. Content in the build folder should NOT be edited directly.

The source files to compile JS, CSS & image are in the **src** folder. It is in this folder that you will edit SCSS, JS and save images for use in the theme.

**images**

With the gulp watch running, images added to the **src/img** folder will be optimized for performance and moved to the correct folder. If you need to use a placeholder image for CMS content add it to the  **src/img/temp** folder to make it easier to delete later.

**SCSS**

The Sass files can be found in **assets/src/style** and then the respective sub folder. On the root level is a file *_load.scss* that should be included in the scss file for a component. This will provide the ability to use variables, mixins & functions.

For components lets use the **BEM** naming convention [https://css-tricks.com/bem-101/]. There are valid reasons for nesting selectors with BEM but it should be the exception.

**Example SCSS with BEM naming **
```
.icon-text {
	font-family: $sans;

	&__title {
		font-size: rem(14);
		line-height: 1.71;
	}

	@include  media-breakpoint-up(lg) {
		&__title {
			font-size: rem(16)
		}
	}
}
```
** Example CSS Output **
```
.icon-text {
	font-family: "Open Sans", arial, sans-serif;
}

.icon-text__title {
	font-size: 0.875rem;
	line-height: 1.71;
}

@media (min-width: 992px) {
	.icon-text__title {
		font-size: 1rem;
	}
}
```
** Rules to follow with styles **

- Do not use ids to apply styles
- Use relative units for font-size for accessibility, I would recommend **rem** .  We have a function, as seen the example above that will automatically convert the pixel size to the proper rem unit (the base html font size is 16) so no math is needed.
- Line height should be in a relative unit. By default this should come from zepplin correct but if not the equation is **line-height/font-size** so a line-height of 24px on a font-size of 16px is **24/16 = 1.5** line-height:1.5
- Follow the existing folder structure for SCSS files to the best of your ability if you have a question ask.
- Each component will generate it's own CSS file that will be included as needed.

**JS**
The JSfiles can be found in **assets/src/js** and then the respective sub folder. Babel has been added to the build process allowing for ES6 to be used.

Be sure to remove all console.logs when finished with them.



### Components
When building components as HTML add each component as a new file in the **html_components** folder. Use the example.html as a starting point as it has all the proper CSS & JS (as of now) in place.

Add the links to the the component based CSS & JS in-between the comments 'start links to component specific CSS & JS' and 'end links to component specific CSS & JS'

These pages are available to view at {domain_name}/themes/custom/demo_design_system_theme/html_components/{file_name}

**Notes about HTML**
- Use classes for styling purposes but you can add ids for JavaScript. Be sure to add a note for the Drupal developer if you do  just incase using an id will be problematic.
- Buttons should be used instead of links for JavaScript interactivity. The exception to this rule is if the link would function as a link if JS was disabled.
- Use HTML5 where appropriate, if a section or article tag is used it should have a heading at the top of the element, if it doesn't use a div.
- Use proper heading structure, do not use a heading because of a font-size.
	- There should only be one h1 on a page.
	- Do not skip levels going down, for example don't have an h4 following an h2
	- You can use CSS to appropriately style the heading as needed.

### Accessibility Notes

- The website should be navigable with a keyboard. The user should know where they are while tabbing, either with a unique focus state or the default browser focus state (or a modified browser focus state)
- All clickable elements must be focusable without a keyboard and be able to have the event trigger with the enter key. Using an HTML button element will take care of both of these requirements.
- Modal windows should be closable with the esc key. When a modal is closed the focus should return to the element that opened the modal. If possible keyboard focus should be trapped in the modal
- Jump menus that scroll the page should also shift the focus to that section.
- All images should have the alt attribute. If the image is presentational only the attribute can be blank. In the HTML components I recommend have **alt="alt text"** for any image that would come from the CMS.
-  Useful tools for testing a11y
	- WAVE https://wave.webaim.org/ - (web interface and also very useful browser plugins)
	- Google Lighthouse https://developers.google.com/web/tools/lighthouse
	- Deque's Axe Chrome plugin https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd?hl=en
	- https://www.lullabot.com/articles/accessibility-tools-make-your-life-easier

### Github Process
- Use branch **theme-designsystem** as the origin (make sure you fetch and pull before starting new tickets)
- Create a new branch for each story that you are assigned with the naming convention of **theme-designsystem-{JIRA ticket number}** example *theme-designsystem-td-2021theme-DF-395*
- When work is complete commit your branch and submit a pull request back to **theme-designsystem** branch.
- If pull request is accepted it will be merged and the branch will be deleted from Github
