/*
* @Author: Sky Ding
* @Date:   2021-01-26 
*/

$(function(){
    $('input[name="loginbtn"]').click(function(event){
        var $name = $('input[name="username"]');
        var $password = $('input[name="password"]');
        var $sharedkey = $('input[name="sharedkey"]');
        var $text = $('#text');
        var _name = $.trim($name.val());
        var _password = $password.val();
        var _sharedkey = $sharedkey.val();

        if('' == _name){
            $text.text('Please Input Your Account!');
            $name.focus();
            return;
        }
        if('' == _password){
            $text.text('Please Input Your Password!');
            $password.focus();
            return;
        }
        if('' == _sharedkey){
            $text.text('Please Input Your Shared Key!');
            $sharedkey.focus();
            return;
        }
        if(_name.length < 5){
            $text.text('The Length Of Account Should Be Larger Than 5 Characters!');
            $name.focus();
            return;
        }
        if(_password.length < 6 || _password.length > 18){
            $text.text('The Length Of Password Should Be In 6 - 18 Characters!');
            $password.focus();
            return;
        }
        if('CSCI3100' != _sharedkey){
            $text.text('Wrong Shared Key Value!');
            $sharedkey.focus();
            return;
        }

        $text.text('Login Successfully, Please Wait!');
    });
});