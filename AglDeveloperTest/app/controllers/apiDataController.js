angular.module('myApp').controller('ApiDataController', function ($scope, ApiDataService) {
    $scope.loading = true;
    ApiDataService.getFormatedData()
        .then(function (data) {
            $scope.error = '';
            $scope.data = data;
            $scope.loading = false;
        }, function (reason) {
            $scope.error = reason;
            $scope.loading = false;
        });
});
