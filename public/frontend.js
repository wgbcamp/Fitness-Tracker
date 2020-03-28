

$(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
  
    });
});


  

  $("#newWorkout").click(function(){

    $.ajax({
        type: "POST",
        url: "/submit",
        dataType: "json",
        data: {
            name: $("#workoutTitle").val(),
            created: Date.now()
        }
    })
    .then(function(data){
        console.log(data);
    })
  })

  
  //INDEXDB TIME//

  //create schema on page load
  $(document).ready(function() {
    //access indexdb
    const request = window.indexedDB.open("TempData", 1);
    
    request.onupgradeneeded = event => {
        const db = event.target.result;
      
        const TempDataStore = db.createObjectStore("TempData", {keyPath: "itemID"});
  
        TempDataStore.createIndex("TempIndex", "name");
      };  

    request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(["TempData"], "readwrite");
        const TempDataStore = transaction.objectStore("TempData");
    
        
        const getCursorRequest = TempDataStore.openCursor();
        getCursorRequest.onsuccess = e => {
            const cursor = e.target.result;
            if (cursor){
                const name = cursor.value.name;
                console.log(name);
                document.getElementById('test').innerHTML = name; 

            }
        }
    }

    
});


//clicking a created workout will add the name to the database
  $(".card-header-icon").click(function(){

      var x = this.id;

  //create database
  const request = window.indexedDB.open("TempData", 1);

  //schema

  request.onupgradeneeded = event => {
      const db = event.target.result;
    
      const TempDataStore = db.createObjectStore("TempData", {keyPath: "itemID"});

      TempDataStore.createIndex("TempIndex", "name");
    };

    request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(["TempData"], "readwrite");
        const TempDataStore = transaction.objectStore("TempData");
        const TempIndex = TempDataStore.index("TempIndex");

        

        //change the value in database
        const getCursorRequest = TempDataStore.openCursor();
        getCursorRequest.onsuccess = e => {
            const cursor = e.target.result;
            if (cursor){
                if(cursor.value.itemID === '1'){
                    const replace = cursor.value;
                    replace.name = x;
                    const name = cursor.value.name;
                    console.log(name);
                    cursor.update(replace);
                } 
            }else{ //add id value from id if none exists
                TempDataStore.add({ itemID : "1", name: x});
            }
        }
        //go to edit page
        var url = "edit";
        $.ajax({
            url: "edit",
            type: "GET",
            success: function(){
                window.location = url;
            }
        });
    }

  

})

