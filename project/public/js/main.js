/* jshint esversion: 6 */

angular
    .module('mainApp', [])
    .controller('mainCntrl', ['$scope', '$log', 'filesService', function($scope, $log, filesService) {
        // call files.list to get data for files component
        filesService.list().then((res) => {
            if (res.data.constructor === Array && res.data.length > 0) {
                $scope.files = [];
                res.data.forEach((item) => {
                    $scope.files.push({fileName: item, isSelected: false});
                });
            } else {
                $log.log(`Error: files.list() did not return an array, instead: ${res.data}`);
            }
        });
    }])
    // filesComponent displays a list of files in direcotry,  download one or multiple
    .component('filesComponent', {
        templateUrl: 'public/templates/files.html',
        bindings: {
            files: '=',
        },
        controller: function(filesService) {

            // download file when name is clicked
            this.getOne = (file) => filesService.get(file);

            // download all that are selected
            this.getSelected = () => {
                let selectedFilesArray = [];

                // create array of file names
                this.files.forEach((fileObj) => {
                    if (fileObj.isSelected) {
                        selectedFilesArray.push(fileObj.fileName);
                    }
                });

                // if array contains at least one file, otherwise do nothing
                if (selectedFilesArray.length) {
                    // if array has multiple file names use fileService.getmultiple
                    if (selectedFilesArray.length > 1) {
                        filesService.getMultiple(selectedFilesArray);
                    // only one file name so use fileService.get
                    } else {
                        filesService.get(selectedFilesArray[0]);
                    }
                }

            };

            // select all files or unselect all
            this.changeSelect = () => {
                this.files.forEach((item) => {
                    item.isSelected = this.selectAll;
                });
            };
        }
    })
    // filesService has three functions to support filesComponent
    .service('filesService', function($http) {
        // get list of files in dir
        this.list = () => {
            return $http({
                method: 'GET',
                url: 'php/files.php',
                params: {
                    action: 'list'
                }
            });
        };
        // download one file
        this.get = (file) => window.location.assign('php/files.php?action=get&file=' + file);

        // download multiple files in zip archive
        this.getMultiple = (files) => window.location = 'php/files.php?action=getMultiple&files=' + files.join('@');
    });
