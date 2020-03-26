$('.navbar-burger').click(function(){
      console.log("ive been clicked");
      if($('.has-dropdown').hasClass('is-active')){
          $('.has-dropdown').removeClass('is-active');
      }else{
          $('.has-dropdown').addClass('is-active');
      }
  
});

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