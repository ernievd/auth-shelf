myApp.service('ShelfService', ['$http', '$location', function ($http, $location) {
    console.log('ShelfService Loaded');
    
    var self = this;
    
    self.shelf = { list: [] };
    self.getShelf = function() {
      $http.get('/api/shelf')
        .then(function(response) {
          console.log('response', response);
          self.shelf.list = response.data;
        })
        .catch(function(error) {
          console.log('error getting shelf', error);
        });
    }

    self.addItem = function(itemIn, userId){
      $http.post(`/api/shelf/${userId}`, itemIn)
	      .then(function (response) {
          console.log('shelf post response', response);
          self.newItem = {};
          self.getShelf();
	      })
	      .catch(function (response) {
		      console.log('error on shelf post', response);
	      });
    }

    self.deleteItem = function(username, itemId){
      $http.delete(`api/shelf/${username}/${itemId}`)
        .then(function (response) {
          console.log('shelf delete response', response);
          self.getShelf();
        })
        .catch(function (response) {
          console.log('error on shelf delete', response);
        });
    }
  }]);
  