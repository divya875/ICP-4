function getGithubInfo(user) {
    console.log(user);
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)
    var xhttp =new XMLHttpRequest();
    var url = "https://api.github.com/users/"+user;

    xhttp.open('GET',url, true);

    xhttp.onload = function () {
        //if the response is successful show the user's details
        if (xhttp.status == 200) {
            showUser(JSON.parse(xhttp.responseText));
            //else display error message
        }
        else {
            noSuchUser(user);
        }
    };
    xhttp.send()

}

function showUser(user) {

    //2. setting the contents of the h2 and the two div elements in the div '#profile' with the user content

// setting the html to elemnts in page using jQuery
    $("#displaytext").text(user.login);
    $(".avatar").html("<img height='200' width='200' src='"+ user.avatar_url+"'/>");
    var link = "<a target='_blank' href='"+user.html_url+"'> Git Hub URL  </a>";
    $(".information").html("<label><u><strong>User Details</strong></u></label>" +
        "<br/><br/><label style='color: #660939'>User name : </label>"+ user.name
        +"<br/> <label style='color: #66111c'>GitHub URL : </label>"+link
        +"<br/> <label style='color: #661d36'>GitHub Repositories Of the User : </label>"+ user.public_repos);
    $("#profile").show();

}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    alert("no such user found")

}


$(document).ready(function(){



    $(document).on('keypress', '#username', function(e){
        $("#profile").hide();
        //check if the enter(or return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //clear the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            getGithubInfo(username);
        }
    })
});