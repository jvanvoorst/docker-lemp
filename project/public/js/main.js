/* jshint esversion: 6 */

angular
    .module('mainApp', [])
    // .controller('mainCntrl', function() {
    // })
    .component('uploadComponent', {
        templateUrl: 'public/templates/uploadTemplate.html'
    })
    .component('files', {
        templateUrl: 'public/templates/files.html',
        controller: function($http) {
            $http.get('getFiles.php')
                .then (function(res) {

            })
        }
    });
    // .service('getFiles', function() {
    //     this.files = [
    //         'one.txt',
    //         'two.txt',
    //         'three.txt'
    //     ];
    // });
