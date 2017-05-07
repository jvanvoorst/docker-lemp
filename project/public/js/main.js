/* jshint esversion: 6 */

angular
    .module('mainApp', [])
    .controller('mainCntrl', ['$scope', '$log', 'files', function($scope, $log, files) {
        // call files.get to get data for files component
        files.get().then(function(res) {
            if (res.data.constructor === Array) {
                $scope.filesData = res.data;
            } else {
                $log.log(`Error: files.get() did not return an array, instead: ${res.data}`);
            }
        });
    }])
    .component('uploadComponent', {
        templateUrl: 'public/templates/uploadTemplate.html'
    })
    .component('files', {
        templateUrl: 'public/templates/files.html',
        bindings: {
            files: '<'
        }
    })
    .service('files', function($http) {
        this.get = function() {
            return $http.get('php/getFiles.php')
        }
    });
