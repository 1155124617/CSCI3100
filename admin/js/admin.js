
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    
    $('#selector').change(function(){
        if($('#selector').val() == "user_C")
        {
            $('#user_C').css("display","block");
            $('#user_c_username_text').text("");
            $('#user_c_password_text').text("");
        }
        else
            $('#user_C').css("display","none");
        
        if($('#selector').val() == "user_U")
        {
            $('#user_U').css("display","block");
            $('#user_u_o_username_text').text("");
            $('#user_u_n_username_text').text("");
            $('#user_u_n_password_text').text("");
        }
        else
            $('#user_U').css("display","none");
        
        if($('#selector').val() == "user_R")
        {
            $('#user_R').css("display","block");
        }
        else
            $('#user_R').css("display","none");
        
        if($('#selector').val() == "user_D")
        {
            $('#user_D').css("display","block");
            $('#user_d_username_text').text("");
            $('#user_d_password_text').text("");
        }
        else
            $('#user_D').css("display","none");
        
        if($('#selector').val() == "admin_C")
        {
            $('#admin_C').css("display","block");
            $('#admin_c_username_text').text("");
            $('#admin_c_password_text').text("");
        }
        else
            $('#admin_C').css("display","none");
        
        if($('#selector').val() == "admin_R")
        {
            $('#admin_R').css("display","block");
        }
        else
            $('#admin_R').css("display","none");
        
        if($('#selector').val() == "chat_R")
        {
            $('#chat_R').css("display","block");
        }
        else
            $('#chat_R').css("display","none");
        
        if($('#selector').val() == "chat_D")
        {
            $('#chat_D').css("display","block");
        }
        else
            $('#chat_D').css("display","none");
        
    });

    $('#user_C').on('submit',function(){
        
        var input = $('#user_C .input100');
        
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        if(check)
        {
            $.ajax({
                async: false,
                url:"http://localhost:8081/admin_user_c",
                type:"POST",
                data:{
                    username: $(input[0]).val(),
                    password: $(input[1]).val()
                }
            }).
            always(function(txt){
                if (txt.responseText == "S"){
                    alert("Create successfully!");
                }
                else{
                    alert("Create failed because this username exists! Please try another username!");
                    check=false;
                }
                
            });
        }
        $("#user_C").trigger("reset");
        return false;
    });
    
    $('#user_R').on('submit',function(){

        $.ajax({
            async: false,
            url:"http://localhost:8081/admin_user_r",
            type:"POST",
        }).
        always(function(txt){
            if (txt.responseText == "F"){
                alert("Retrieve failed!");
            }
            else{
                var str = "<thead><tr><th>Users:</th></tr></thead><br><tbody>"+"<tr><td>username:</td>"+"<td>password:</td><tr><br>";
                for (let i = 0; i<txt.length; i++)
                    str = str +"<tr><td>"+txt[i]["username"]+"</td>"+"<td>"+txt[i]["password"]+"</td><tr>";
                str += "</tbody>"
                $('#all_users').html(str);
            }
                
        });
        
        return false;
    });
    
    $('#user_D').on('submit',function(){
        
        var input = $('#user_D .input100');
        
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        if(check)
        {
            $.ajax({
                async: false,
                url:"http://localhost:8081/admin_user_d",
                type:"POST",
                data:{
                    username: $(input[0]).val()
                }
            }).
            always(function(txt){
                if (txt.responseText == "S"){
                    alert("Delete successfully!");
                }
                else{
                    alert("Delete failed because no such username! Please try another username!");
                    check=false;
                }
                
            });
        }
        $("#user_D").trigger("reset");
        return false;
    });
    
    $('#user_U').on('submit',function(){
        
        var input = $('#user_U .input100');
        
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        if(check)
        {
            $.ajax({
                async: false,
                url:"http://localhost:8081/admin_user_u",
                type:"POST",
                data:{
                    o_username: $(input[0]).val(),
                    n_username: $(input[1]).val(),
                    n_password: $(input[2]).val()
                }
            }).
            always(function(txt){
                if (txt.responseText == "S"){
                    alert("Update successfully!");
                }
                else{
                    alert("Update failed because no such username! Please try another username!");
                    check=false;
                }
                
            });
        }
        $("#user_U").trigger("reset");
        return false;
    });
    
    $('#admin_C').on('submit',function(){
        
        var input = $('#admin_C .input100');
        
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        if(check)
        {
            $.ajax({
                async: false,
                url:"http://localhost:8081/admin_admin_c",
                type:"POST",
                data:{
                    username: $(input[0]).val(),
                    password: $(input[1]).val()
                }
            }).
            always(function(txt){
                if (txt.responseText == "S"){
                    alert("Create successfully!");
                }
                else{
                    alert("Create failed because this username exists! Please try another username!");
                    check=false;
                }
                
            });
        }
        $("#admin_C").trigger("reset");
        return false;
    });
    
    $('#admin_R').on('submit',function(){

        $.ajax({
            async: false,
            url:"http://localhost:8081/admin_admin_r",
            type:"POST",
        }).
        always(function(txt){
            if (txt.responseText == "F"){
                alert("Retrieve failed!");
            }
            else{
                var str = "<thead><tr><th>Admins:</th></tr></thead><br><tbody>"+"<tr><td>username:</td>"+"<td>password:</td><tr><br>";
                for (let i = 0; i<txt.length; i++)
                    str = str +"<tr><td>"+txt[i]["username"]+"</td>"+"<td>"+txt[i]["password"]+"</td><tr>";
                str += "</tbody>"
                $('#all_admins').html(str);
            }
                
        });
        
        return false;
    });
    
    $('#chat_R').on('submit',function(){

        $.ajax({
            async: false,
            url:"http://localhost:8081/admin_chat_r",
            type:"POST",
        }).
        always(function(txt){
            if (txt.responseText == "F"){
                alert("Retrieve failed!");
            }
            else{
                var str = "<thead><tr><th>Chats:</th></tr></thead><br><tbody>"+"<tr><td>id:</td>"+"<td>username:</td>"+"<td>comment:</td>"+"<td>subject:</td>"+"<td>time:</td><tr><br>";
                for (let i = 0; i<txt.length; i++)
                    str = str +"<tr>"+"<td>"+txt[i]["id"]+"</td>"+"<td>"+txt[i]["username"]+"</td>"+"<td>"+txt[i]["comment"]+"</td>"+"<td>"+txt[i]["subject"]+"</td>"+"<td>"+txt[i]["time"]+"</td><tr>";
                str += "</tbody>"
                $('#all_chats').html(str);
            }
                
        });
        
        return false;
    });
    
    $('#chat_D').on('submit',function(){

        $.ajax({
            async: false,
            url:"http://localhost:8081/admin_chat_d",
            type:"POST",
        }).
        always(function(txt){
            if (txt.responseText == "F"){
                alert("Delete failed!");
            }
            else{
                alert("Delete successfully!");
            }
                
        });
        
        return false;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        if ($(input).attr('name') == 'username'){
            if($(input).val().trim() == '')
            {
                $('#user_c_username_text').text("Empty username!");
                $('#user_u_n_username_text').text("Empty new username!");
                $('#user_d_username_text').text("Empty username!");
                $('#admin_c_username_text').text("Empty username!");
                return false;
            }
            else if($(input).val().length < 5 || $(input).val().length > 16){
                $('#user_c_username_text').text("username: 5-16 letter or numbers!");
                $('#user_u_n_username_text').text("new username: 5-16 letter or numbers!");
                $('#user_d_username_text').text("username: 5-16 letter or numbers!");
                $('#admin_c_username_text').text("username: 5-16 letter or numbers!");
                return false;
            }
            else{
                $('#user_c_username_text').text("");
                $('#user_u_n_username_text').text("");
                $('#user_d_username_text').text("");
                $('#admin_c_username_text').text("");
            }
        }
        else if ($(input).attr('name') == 'o_username'){
            if($(input).val().trim() == '')
            {
                $('#user_u_o_username_text').text("Empty old username!");
                return false;
            }
            else if($(input).val().length < 5 || $(input).val().length > 16){
                $('#user_u_o_username_text').text("old username: 5-16 letter or numbers!");
                return false;
            }
            else{
                $('#user_u_o_username_text').text("");
            }
        }
        else if ($(input).attr('name') == 'pass'){
            if($(input).val().trim() == '')
            {
                $('#user_c_password_text').text("Empty password!");
                $('#user_u_n_password_text').text("Empty new password!");
                $('#user_d_password_text').text("Empty password!");
                return false;
            }
            else if($(input).val().length < 5 || $(input).val().length > 16){
                $('#user_c_password_text').text("password: 5-16 letter or numbers!");
                $('#user_u_n_password_text').text("new password: 5-16 letter or numbers!");
                $('#user_d_password_text').text("password: 5-16 letter or numbers!");
                return false;
            }
            else{
                $('#user_c_password_text').text("");
                $('#user_u_n_password_text').text("");
                $('#user_d_password_text').text("");
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);
