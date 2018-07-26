
module.exports = function(grunt){

require("load-grunt-tasks")(grunt);

grunt.initConfig({

 "babel": {
            options: {
              sourceMap: true
            },
            dist: {
                files: [{
                  expand: true,
                  cwd: 'src',
                  src: ['index.js'],
                  dest: 'dist',
                  ext: '.js'
              }]
            }
        },
  "watch": {
            scripts: {
                files: ["src/*.js"],
                tasks: ["eslint","babel"]
            }
        },
  "eslint": {
            options: {fix:true},
            target: ['src/*.js']
        },

    
});

grunt.registerTask("default", ["eslint","babel"]);
};
