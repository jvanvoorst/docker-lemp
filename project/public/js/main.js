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

    }]);

// filesComponent displays a list of files in direcotry,  download one or multiple
angular.module('mainApp').component('filesComponent', {
        templateUrl: 'public/templates/files.html',
        bindings: {
            files: '=',
        },
        controller: function(filesService) {
            let vm = this;
            vm.getOne = getOne;
            vm.getSelected = getSelected;
            vm.changeSelectAll = changeSelectAll;

            // download file when name is clicked
            function getOne(file) {
                filesService.get(file);
            }

            // download all that are selected
            function getSelected() {
                let selectedFilesArray = [];

                // create array of file names
                vm.files.forEach((fileObj) => {
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
                vm.changeSelectAll(false);
            }

            // select all files or unselect all
            function changeSelectAll(value) {
                console.log(value);
                vm.files.forEach((item) => {
                    item.isSelected = value;
                });
            }
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

// upload component
angular.module('mainApp').component('uploadComponent', {
    templateUrl: 'public/templates/upload.html',
    bindings: {

    },
    controller: function(uploadService) {

         this.upload = () => {
            let file = document.getElementById('file').files[0];
            let formData = new FormData();
            formData.append('file', file);

             uploadService.upload(formData).then((res) => {
                 console.log(res);
                 this.message = res.data;
             });
         };


    }

})
.service('uploadService', function($http) {

    this.upload = (data) => {
        return $http({
            method: 'POST',
            url: 'php/upload.php',
            data: data,
            headers: {
                'Content-Type': undefined
            }
        });
    };
});
