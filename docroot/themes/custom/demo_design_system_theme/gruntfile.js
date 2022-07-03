const {pathsToDependencies: {defaultPathsToDependencies, localPathToDependencies}} = require(
  './gruntfile.config');

module.exports = function (grunt) {
  grunt.initConfig({
    twigRender: {
      your_target: {
        files: [{
          data: [
            `${localPathToDependencies !== '' ? localPathToDependencies : defaultPathsToDependencies}`,
            './html_components/twig/json/individual-cta-row.json',
            './html_components/twig/json/group-cta-rows-only-with-img.json',
            './html_components/twig/json/group-cta-rows.json',
            './html_components/twig/json/cta-block-cards.json',
            './html_components/twig/json/half-content-cards-with-buttons.json',
            './html_components/twig/json/half-content-people-tiles-with-buttons.json',
            './html_components/twig/json/group-of-half-people-tiles-with-buttons.json',
            './html_components/twig/json/group-cta-rows-without-buttons.json',
            './html_components/twig/json/enumerated-circle-component.json',
            './html_components/twig/json/a-spot-hero-carousel.json',
            './html_components/twig/json/two-columns-a-spot-hero-carousel.json',
            './html_components/twig/json/a-spot-hero-light-theme.json',
            './html_components/twig/json/a-spot-hero-dark-theme.json',
            './html_components/twig/json/b-spot-hero.json',
            './html_components/twig/json/selection-hero-video-or-image.json',
            './html_components/twig/json/basic-form.json',
            './html_components/twig/json/internal-grid-css-classes.json',
            './html_components/twig/json/back-to-top-buttons.json',
            './html_components/twig/json/breadcrumbs.json',
            './html_components/twig/json/people-profile-cards.json',
            './html_components/twig/json/navs-variations.json',
            './html_components/twig/json/tabs-dropdown-variations.json',
            './html_components/twig/json/list-group.json',
            './html_components/twig/json/vertical-anchor-navigation.json',
            './html_components/twig/json/pinch-to-zoom.json',
            './html_components/twig/json/jynarque/community-build-registration-microsite.json'
          ],
          expand: true,
          cwd: 'html_components/twig/',
          src: ["**/*.twig", "!**/_*.twig"],
          dest: './html_components/',
          ext: '.html'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-twig-render');
  grunt.registerTask('default', ['twigRender']);

};

