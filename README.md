# Friend List - HTML5

> Projeto de exemplo da palestra do .NET Coders no dia 11/05/2014 usando a tag audio, Geolocation API, Google Maps e Local Storage

##Demo

[demo] (http://kiide.github.io/geolocation-html5/)


##Conceitos

- HTML5 http://pt.wikipedia.org/wiki/HTML5, http://tableless.com.br/html5/ 
- [Geolocation API] (https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)
- [HTML5 audio] (https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Audio)

##Bibliotecas, plugins e frameworks

- [jQuery] (http://jquery.com/)
- [Bootstrap] (http://getbootstrap.com/)
- [jQuery.geocomplete] (http://ubilabs.github.io/geocomplete/)
- [jQuery.maskedinput] (http://digitalbush.com/projects/masked-input-plugin/)
- [Modernizr] (http://modernizr.com/)

##Pontos de interesse

####Organização do código

```
geolocation-html5/
├── bower_components/
│   └── *
├── css/
│   └── app.css
├── img/
│   └── *
├── js/
│   ├── app.js
│   └── database.js.js
└── media/
    └── *
```
- bower_components: pasta para as bibliotecas, plugins e frameworks;
- css: pasta de css;
- img: pasta para imagens usadas no projeto;
- js/app.js: arquivo de load do jQuery e manipulação do DOM;
- js/database.js: arquivo que gerencia o local Storage;
- media: pasta para audios;


####Layout 

Todo projeto é desenvolvido usando bootstrap e pequenas modificações em css.

####Máscara

Para a máscara do campo telefone eu utilizo o plugin `maskedinput`, dentro de `app.js` temos o método `loadMask`, que é responsável por adicionar a máscara.

```javacript
loadMask: function () {
	this.$telephone.mask('(99) 9999-9999');
},
```

####Geolocalização

Para geolocalização eu uso o plugin `jQuery.geocomplete` para transformar o input de endereço em um autocomplete - para mais detalhes veja a documentação do `jQuery.geocomplete` - o método `loadMap` recebe um objeto de geolocalização representando a localização atual. A localização atual é passada para o plugin em sua inicialização.

```js
loadMap: function (position) {
  position = position || {};
	var $map = this.$map;
	var mapOptions = { map: $map }; 
	if (position.coords) { 
  	mapOptions.location = [position.coords.latitude, position.coords.longitude];
	}
	// create a map using geocomplete
	// see http://ubilabs.github.io/geocomplete/
	this.$address.geocomplete(mapOptions);
},
```

A inicialização do plugin depende da localização atual, para isso temos o método `getCurrentPosition` que é responsável por adquirir a posição atual.

```js
getCurrentPosition: function(callback) {
  navigator.geolocation.getCurrentPosition(callback, callback);
},
```

Para garantir que o browser tem suporte a geolocalização, eu uso o método `checkSupportToGeolocation` que verifica se o browser suporta geolocalização.

```js
checkSupportToGeolocation: function () {
  return Modernizr.geolocation;
},
```

####LocalStorage

Toda manipualção do `localStorage` é feita pelo arquivo `database.js`, onde temos a classe `DataBase` que possui os métodos `add` que adicionar um objeto no `localStorage` e o método `findAll` que retorna todos os objetos do `localStorage`.

```js
DataBase.prototype.findAll = function (callback) {
	// check if callback exists, if no exists create a empty function
  callback = callback || function () {};
	var data = JSON.parse(localStorage[this._STORAGE_ID]);
	callback.call(this, data.friends);
}

DataBase.prototype.add = function (friend, callback) {
	callback = callback || function () {};
	// get all friends in database and convert to JSON
	var data = JSON.parse(localStorage[this._STORAGE_ID]);
	// add friend in array
	data.friends.push(friend);
	// save all friends in database
	localStorage[this._STORAGE_ID] = JSON.stringify(data);
	callback.call(this);
};
```
Como temos a limitação do `localStorage` trabalhar apenas com `strings`, uso os métodos `JSON.stringify` e `JSON.parse` para desserializar e serializar `strings` para `JSON`.

##Agradecimentos

[LGroup] (http://www.lgroup.com.br/)

.NET Coders


##Dúvidas? 

Manda um oi no twitter [@_kiide] (https://twitter.com/_kiide)


Fork me and pull request!
