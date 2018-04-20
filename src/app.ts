import * as $ from 'jquery';
import { SimpleChatClientCore } from 'simple-chat-client-core';

document.addEventListener('DOMContentLoaded', function () {
    var $loginScreen = $('#login');
    var $loginForm = $('#loginForm');
    var $usernameInput = $('#username');
    var $hostInput = $('#host');

    var $chatScreen = $('#chat');
    var $messageForm = $('#messageForm');
    var $messageInput = $('#message');
    var $messageList = $('#messages');
    var $fileInput = $('#file');
    var $fileButton = $('#fileButton');
    var $userList = $('#users');

    var core;
    var defaultServerPort = parseInt(window.location.port, 10) + 1;

    $usernameInput.val(getUser() || 'user' + new Date().getTime());

    $hostInput.val(getHost() || window.location.hostname + ':' + defaultServerPort);
    $loginScreen.show();

    $loginForm.submit(handleLoginFormSubmit);
    $messageForm.submit(handleMessageFormSubmit);
    $fileInput.on('change', handleFileChange);
    $fileButton.click(handleFileButtonClick);

    function appendMessage(html) {
        $messageList.append($('<li>').html(html));
    }

    function getHost() {
        return localStorage.getItem('host');
    }

    function getUser() {
        return localStorage.getItem('user');
    }

    function handleChatHistory(history) {
        history.forEach(handleChatMessage);
    }

    function handleChatMessage(msg) {
        if (msg.type === 'text') {
            appendMessage('@' + msg.author + ': ' + msg.text);
        } else if (msg.type === 'image') {
            appendMessage('@' + msg.author + ': <img src="' + msg.image + '">');
        }
    }

    function handleFileButtonClick(e) {
        e.preventDefault();
        $fileInput.click();
    }

    function handleFileChange(e) {
        var maxFileSize = 200 * 1024;
        if (e.target.files.length > 0) {
            if (e.target.files[0].size < maxFileSize) {
                var reader = new FileReader();
                reader.addEventListener('load', function () {
                    core.sendImage(reader.result);
                });
                reader.readAsDataURL(e.target.files[0]);
            }
            else {
                alert('File too big. Max file size is ' + maxFileSize + ' bytes.');
            }
        }
    }

    function handleLoginFormSubmit(e) {
        e.preventDefault();
        setHost($hostInput.val());
        setUser($usernameInput.val());
        $loginScreen.hide();
        $chatScreen.show();
        initChat();
    }

    function handleMessageFormSubmit(e) {
        e.preventDefault();
        core.sendText($messageInput.val());
        $messageInput.val('').focus();
    }

    function handleUserJoin(user) {
        $userList.append($('<li>').text(user));
    }

    function handleUserLeft(msg) {
        $userList.children('li').each(function (i, element) {
            if ($(this).text() === msg) {
                $(this).remove();
            }
        });
    }

    function handleUserList(userList) {
        userList.forEach(handleUserJoin);
    }

    function initChat() {
        core = new SimpleChatClientCore(getHost()!);
        core.login(getUser()).then(() => {
            core.on('chat message', handleChatMessage);
            core.on('user join', handleUserJoin);
            core.on('user list', handleUserList);
            core.on('user left', handleUserLeft);
            core.on('chat history', handleChatHistory);
        });

    }

    function setHost(host) {
        localStorage.setItem('host', host);
    }

    function setUser(name) {
        localStorage.setItem('user', name);
    }
});