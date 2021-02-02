const express = require("express");
const app = express();
const jsonParser = express.json();
const bodyParser = require("body-parser");
const urlencodeParser = bodyParser.urlencoded({extended: false});

let emails = ["gum.fidan2017@yandex.ru"];
let logins = ["fidan"];
let passwords = [123];

//registration
app.get("/register", urlencodeParser, function(request, response){
	response.sendFile(__dirname + "/login_edit/reg.html");
});

app.post("/register", jsonParser, urlencodeParser, function(request, response){
	if (!request.body) return response.sendStatus(400);
	var count = 1;
	let res = "";
	for (let i = 0; i < emails.length; i++){
		if (emails[i] === request.body.email){
			res = "Данная почта уже использована";
			break;
		} else if (logins[i] === request.body.login){
			res = "Данный логин занят";
			break;
		}
	}
	if (res === ""){
		emails.push(request.body.email);
		logins.push(request.body.login);
		passwords.push(request.body.password);
		count = 0;
	}
	response.send(res);
	//response.json(request.body);
	//response.sendFile(__dirname + "/login_edit/reg.html");
});



//log in
app.get("/login", jsonParser, function(request, response){
	response.sendFile(__dirname + "/login_edit/room.html");
});

app.post("/login", jsonParser, urlencodeParser, function (request, response){
	if(!request.body) return response.sendStatus(404);
	let user = null;
	let res = "";
	for (let i = 0; i < logins.length; i++){
		if(logins[i] == request.body.login){
			if(passwords[i] == request.body.password){
				user = request.body.login;
				res = "Вход";
				break;
			} else {
				res = "Неверный пароль";
				break;
			}
		} else{
			res = "Пользователя не существует";
		}
	}
	console.log(user);
	if (user){
		response.send(res);
	} else {
		response.send(res);
	}
});

app.get("/room", function(request, response){
	response.sendFile(__dirname + "/login_edit/room.html");
});

app.use(express.static(__dirname + "/login_edit"));
 
app.listen(3000);