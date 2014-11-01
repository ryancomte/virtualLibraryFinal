angular.module('VirtualBook').controller('BookCtrl', function($scope, BookService) {
    BookService.getBooks().then(function(response) {
        $scope.books = response.data;
    });

    $scope.save = function(book) {
        BookService.editBook(book).then(function(response) {
            book = response.data;
        })
    };
    $scope.createBook = function(newBook) {
        BookService.addBook(newBook).then(function(response) {
            $scope.books.push(response.data);
            $scope.newBook = null;
        })
    };
    $scope.deleteBook = function(book) {
        BookService.deleteBook(book).then(function(response) {
            if(response.status === 200){
                for(var i =0; i< $scope.books; i++){
                    console.log(i);
                    if($scope.books[i].title === book.title){
                        $scope.books.splice(i,1);
                    }
                }
            }
        })
    }
});