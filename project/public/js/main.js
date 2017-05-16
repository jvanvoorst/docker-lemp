/* jshint esversion: 6 */

angular
    .module('mainApp', [])
    .factory('errorService', errorService);

    function errorService() {
        return { showError: showError };

        function showError(error) {
            console.log(`$http failed: ${error}`);
            return $q.reject(error);
        }
    }

// filesComponent displays a list of files in direcotry,  download one or multiple
(function() {
    'use strict';

    angular
        .module('mainApp')
        .factory('filesService', filesService)
        .component('filesComponent', {
            templateUrl: 'public/templates/files.html',
            controller: FilesController
        });

    FilesController.$inject = ['filesService'];

    function FilesController(filesService) {
        let vm = this;
        vm.changeSelectAll = changeSelectAll;
        vm.files = [];
        vm.getOne = getOne;
        vm.getSelected = getSelected;

        // call filesService.list to get data for files component
        activate();

        function activate() {
            filesService.list()
                .then((res) => {
                    if (res.data.constructor === Array && res.data.length > 0) {
                        vm.files = [];
                        res.data.forEach((item) => {
                            vm.files.push({fileName: item, isSelected: false});
                        });
                    } else {
                        console.log(`Error: files.list() did not return an array, instead: ${res.data}`);
                    }
                });
        }

        // download file when name is clicked
        function getOne(file) {
            filesService.get(file);
            activate();
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
            activate();
        }

        // select all files or unselect all
        function changeSelectAll(value) {
            vm.files.forEach((item) => {
                item.isSelected = value;
            });
        }
    }

    // filesService has three API calls to support filesComponent
    function filesService($http, $window, errorService) {
        return {
            get: get,                   // get list of files in dir
            getMultiple: getMultiple,   // download one file
            list: list                  // download multiple files in zip archive
        };

        function get(file) { $window.location.assign('php/files.php?action=get&file=' + file); }

        function getMultiple(files) { $window.location = 'php/files.php?action=getMultiple&files=' + files.join('@'); }

        function list() {
            return $http({
                method: 'GET',
                url: 'php/files.php',
                params: {
                    action: 'list'
                }
            })
            .catch(errorService.showError);
        }
    }
})();

// upload component
(function() {
    'use strict';

    angular
        .module('mainApp')
        .factory('uploadService', uploadService)
        .component('uploadComponent', {
            templateUrl: 'public/templates/upload.html',
            controller: UploadController
        });

    UploadController.$inject = ['uploadService'];

    function UploadController(uploadService) {
        let vm = this;
        vm.upload = upload;

         function upload() {
            let file = document.getElementById('file').files[0];
            let formData = new FormData();
            formData.append('file', file);

             uploadService.upload(formData)
                .then((res) => {
                    vm.message = res.data;
                    angular.element(document.querySelector('#file')).val('');
                });
         }
    }

    // API call to support upload component
    function uploadService($http, errorService) {
        return {
            upload: upload
        };

        function upload(data) {
            return $http({
                method: 'POST',
                url: 'php/upload.php',
                data: data,
                headers: {
                    'Content-Type': undefined
                }
            })
            .catch(errorService.showError);
        }
    }
})();
