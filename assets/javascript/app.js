var titles = ["Justice League", "Superman", "Batman", "Wonder Woman", "Aquaman", "The Flash", "Green Lantern", "Martian Manhunter", "Green Arrow", "Hawkman", "Captain Marvel", "Hawkgirl", "Captain Atom", "DC Cyborg"];

var button;
// new title that will be added through input
var newTitles = "";  
// function to create new buttons from the titles array
var buttonGenerator = function (){
	 $("#buttonArea").empty();
	// loops through the array and creates buttons
	for(i = 0; i < titles.length; i++) {
		button = $("<button type=" + "button" + ">" + titles[i] + "</button>").addClass("btn btn-info").attr("data",titles[i]);
		$("#buttonArea").append(button);
	};
}
// The user clicks on a button, which generates images from the GIPHY API 
$("#buttonArea").on("click", ".btn", function(){
	$("#gifArea").empty();

  		var cartoon = $(this).attr("data");
  		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&apikey=CjpYnNJTCAkrTYyRQBb9McZqPTr1YuND&limit=5";

  		$.ajax({
  			url: queryURL,
  			method: "GET" 

  		}).done(function(response){
  			console.log(response);
  			
          	var results = response.data;

          	for (var i = 0; i < results.length; i++) {
          		// a div is created to hold a gif of any title
	          	var titleDiv = $("<div>");
	 			
	          	// Under every gif, display its rating
	 			var p = $("<p>");
	 			p.text(results[i].rating);
	 			var p = $("<p>").text("Rating: " + results[i].rating);

	 			var titleImage = $("<img>");

	 			titleImage.attr("src", results[i].images.fixed_height_still.url);
	 			titleImage.attr("data-still", results[i].images.fixed_height_still.url);
	 			titleImage.attr("data-animate", results[i].images.fixed_height.url)
	 			titleImage.attr("data-state", "still")
	 			titleImage.addClass("gif");
	 			
	 			// image is appended to the div
	 			titleDiv.append(titleImage);
	 			// rating is appended to the div below the gif
	 			titleDiv.append(p); 			
	 			// new images will be placed at the top of the containing gif area
	 			$("#gifArea").prepend(titleDiv);
 			}
  		})
  })
// User clicks the still GIPHY images, and it animates, click again and it stops
$("#gifArea").on("click", ".gif", function(event){
	event.preventDefault();
	
	var state = $(this).attr("data-state");
	
	
	if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

})
// takes the value from the input box and adds it into the array
$(".submit").on("click", function(event){
	event.preventDefault();

	console.log("submit");
	// sets inputted value to newTitle 
	newTitle = $("#title-input").val();
	// new title is added to the array 
	titles.push(newTitle);
	console.log(titles);
	// call the function that creates the new button
	buttonGenerator();
});



buttonGenerator();
 