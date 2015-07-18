app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('results', {
                url: '/roomresult/{id}',
                templateUrl: '/home.html',
                controller: 'rooms',
                resolve: {
                    restaurants: ['$http', function($http){
                      return auth.currentUser().then(function(){
                        return $http.get()
                      });
                        
                    }],
                    
                }
            })              
    }
]);
