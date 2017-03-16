angular.module('myApp').service('ApiDataService', function ($http, $q) {
    this.getRowData = function () {
        return $http.jsonp('http://agl-developer-test.azurewebsites.net/people.json?callback=JSON_CALLBACK');
    };

    this.getFormatedData = function () {
        var q = $q.defer();
        this.getRowData()
            .then(function (rowData) {
                this.data = formatData(rowData.data);
                q.resolve(this.data);
            }, function () {
                q.reject('AGL Web Services Failed to return json response.');
            });
        return q.promise;
    }

    function formatData(data) {
        var flattenedArr = _.flatMap(data, function (owner) {
            return _.map(owner.pets, function (pet) {
                return { gender: owner.gender, petName: pet.name, petType: pet.type };
            });
        });

        var formatedArr = _.chain(flattenedArr)
                            .filter({ 'petType': 'Cat' })
                            .sortBy('petName')
                            .groupBy('gender')
                            .value();

        return formatedArr;
    }
});