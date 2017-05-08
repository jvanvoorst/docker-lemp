/* jshint esversion: 6 */

angular
    .module('mainApp', [])
    .controller('mainCntrl', ['$scope', '$log', 'files', function($scope, $log, files) {
        // call files.list to get data for files component
        files.list().then(function(res) {
            if (res.data.constructor === Array && res.data.length > 0) {
                $scope.files = res.data;
            } else {
                $log.log(`Error: files.get() did not return an array, instead: ${res.data}`);
            }
        });
    }])
    .component('files', {
        templateUrl: 'public/templates/files.html',
        bindings: {
            files: '=',
        },
        controller: function(files) {
            this.downloadOne = function(file) {
                files.get(file);
            };
        }
    })
    .service('files', function($http) {
        this.list = function() {
            return $http.get('php/getFiles.php');
        };
        this.get = function(file) {
            console.log(file);
            window.location.assign('php/download.php?file=' + file);
        };
    });
