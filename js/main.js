// listen for form submit
document.getElementById('myform').addEventListener('submit', saveBookmark);

//save Bookmark
function saveBookmark(e) {
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName,siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    };

    /*//local Storage Test
    localStorage.setItem('test','Hello World');
   console.log( localStorage.getItem('test'));
   localStorage.removeItem('test');
    console.log( localStorage.getItem('test'));
*/

    // Test if bookmark is null
    if(localStorage.getItem('bookmarks') === null){
        // Init array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from localstorage
      bookmarks = JSON.parse( localStorage.getItem('bookmarks'));
   // Add bookmarks to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }



    //Clear Form
    document.getElementsById('myform').reset();

    //Re fetch bookmarks
    fetchBookmarks();


    //prevent form from submitting
    e.preventDefault();

    }

//Delete bookmark

function deleteBookmark(url){

    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop throught bookmarks

    for( i =0;i < bookmarks.length;i++){
        if(bookmarks[i].url == url){
            // Remove from array
             alert('yaha par agar agaya toh kaam hojayega');
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get Output Id

    var bookmarkResults = document.getElementById('bookmarksResult');

    //Build Output

    bookmarkResults.innerHTML = '';

    for(var i =0;i < bookmarks.length; i++){
        var name =bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="well">' +
                                      '<h3>'+name+
                                       '<a class="btn btn-default" target="_blank" href="'+url+'" >Visit</a></a> ' +
                                        '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="" >Delete</a></a>' +
                                        '</h3>'+
                                       '</div>';

    }



}



function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl){
        alert('Please fill the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid url');
        return false;
    }

    return true;
}