

(function ($) {
    "use strict";
    /*==================================================================
    [ Validate ]*/



    window.onload=function(){
        if($.cookie("username")===undefined)
        {
            alert("You already logout, please log in first!");
            window.location.replace("../sign_in/index.html");
        }
        else
            $("#helloUser").text("hello, "+$.cookie("username")+" !  ");
        
        $('#logout').click(function(){
            $.removeCookie("username", {path:'/'});
        });
        
        $.ajax({
          url: "comments.txt",
          type: "GET" })
          .done(function(txt){
            $("#comments").html(txt);
          });
        
    };
    
    
    
    
})(jQuery);


function processForm2(current1){

   let $new = $("<ul><li><img style = \"border-radius: 50%\"></img><div><h5></h5><h6></h6><p></p><table></table><div><small><a href=\"#/\" onclick=\"reply(this)\">Reply</a></small></div></div></li></ul>");
   $new.addClass("media-list");
   $new.find("li").addClass("media");
   $new.find("p").html(current1.previousSibling.elements[1].value);
   var comment = current1.previousSibling.elements[1].value;
   $new.find("div").addClass("media-body");
   $new.find("h5").html(current1.previousSibling.elements[0].value);
   var subject = current1.previousSibling.elements[0].value;
   $new.find("h6").html(getCookie("username"));
   var username = getCookie("username");
   //bonus question
   let d = new Date();
   let timeString = d.yyyymmdd();
   console.log(timeString);
   $new.find("table").html('<tr><td>Browser:</td><td>'+navigator.appName+","+navigator.appCodeName+'</td></tr>');
   $new.find("table").append('<tr><td>Time:</td><td>'+d+'</td></tr>');
   $new.find("table").append('<tr><td>IP:</td><td>'+returnCitySN["cip"]+'</td></tr>');
   $new.find("table").append('<tr><td>Location:</td><td>'+returnCitySN["cname"]+'</td></tr>');


    $new.find("img").attr({
      "src": "./images/faces/"+$("select").val(),
      "width": "60px",
      "height": "60px",
      "display": "flex",
      "overflow": "hidden"
    })


   $(current1.parentNode.parentNode.parentNode).append($new)
   current1.parentNode.innerHTML="";

    $.ajax({
       type: "POST",
       url: "/main_page/comments.txt",
    data: {data: document.getElementById("comments").innerHTML},
    success:(function(txt){alert(txt);})
     });
     console.log("first success");
    
     $.ajax({
      url: "/main_page/commentsupload",
      type: "POST",
      data: {
        comment: comment,
        subject: subject,
        username: username,
        time: timeString
      },
      success: (function(res){
        console.log(res);
      })
    });
    console.log("second success");

}

function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++)
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

function processForm1(){
   let $new = $("<li><img style = \"border-radius: 50%\"></img><div><h5></h5><h6></h6><p></p><table></table><div><small><a href=\"#/\" onclick=\"reply(this)\">Reply</a></small></div></div></li>");
   $new.addClass("media");

   $new.find("p").html($("#inputcomment").val());
   $new.find("div").addClass("media-body");
   var comment = $("#inputcomment").val();
   $new.find("h5").html($("#inputsubject").val());
   var subject = $("#inputsubject").val();
   $new.find("h6").html(getCookie("username"));
   var username = getCookie("username");

   let d = new Date();
   let timeString = d.yyyymmdd();
   console.log(getCookie("username"));
   $new.find("table").html('<tr><td>Browser:</td><td>'+navigator.appName+","+navigator.appCodeName+'</td></tr>');
   $new.find("table").append('<tr><td>Time:</td><td>'+d+'</td></tr>');
   $new.find("table").append('<tr><td>IP:</td><td>'+returnCitySN["cip"]+'</td></tr>');
   $new.find("table").append('<tr><td>Location:</td><td>'+returnCitySN["cname"]+'</td></tr>');


   $new.find("img").attr({
     "src": "./images/faces/"+$("select").val(),
     "width": "60px",
     "height": "60px",
     "display": "flex",
     "overflow": "hidden"
   })



   $("#comments").append($new)
   $("form").trigger("reset");

    $.ajax({
      url: "/main_page/comments.txt",
      type: "POST",
      data: {data: document.getElementById("comments").innerHTML},
      success:(function(txt){alert(txt);})
    });
    console.log("First ajax success");
    
    $.ajax({
      url: "/main_page/commentsupload",
      type: "POST",
      data: {
        comment: comment,
        subject: subject,
        username: username,
        time: timeString
      },
      success: (function(res){
        console.log(res);
      })
    });
    console.log("Second success");




}

function reply(current2){
  let formCode="<div  style=\"margin: 1.5em\"><form><div class=\"form-group\"><label for=\"inputsubject\">Subject</label><input type=\"text\" class=\"form-control\"name=\"subject\"><label for=\"inputcomment\">Your comment</label><textarea class=\"form-control\" rows=\"5\"name=\"comment\"></textarea><label for=\"inputhead\">Choose your photo</label><div><select><option value=\"face1.jpg\">head 1</option><option value=\"face2.jpg\">head 2</option><option value=\"face3.jpg\">head 3</option><option value=\"face4.jpg\">head 4</option><option value=\"face5.jpg\">head 5</option><option value=\"face6.jpg\">head 6</option><option value=\"face7.jpg\">head 7</option><option value=\"face8.jpg\">head 8</option><option value=\"face9.jpg\">head 9</option><option value=\"face10.jpg\">head 10</option></select></div></div></form><button class=\"btn btn-primary\"  onclick=\"processForm2(this)\">Add comment</button></div>";
  $(current2.parentNode.parentNode).append(formCode)

}

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),'-',
          (mm>9 ? '' : '0') + mm,'-',
          (dd>9 ? '' : '0') + dd,
         ].join('');
};  

