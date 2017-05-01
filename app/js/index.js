'use strict';
var playlistParent = document.getElementsByClassName('playlist-group')[0];
listPlaylists();
/**
 * @description gets playlists from json and sets as html elements within success
 */
function listPlaylists() {
  var playlists = {};
  document.getJSON({
    url: '../data/songs.json',
    success: function (json) {
      if (typeof json.err !== 'undefined') {//if file is empty
        playlistParent.innerHTML = 'There isn\'t any playlist.';
        return;
      }
      console.log('getJSON success');
      playlists = json;
      for (let i = 0; i < playlists.length; i++) {
        createItem(playlists[i].name, playlists[i].token, playlists[i].songs.length);
      }
    },
    error: function (error) {
      console.error('An error occured');
      console.error(error);
    },
    complete: function () {
      console.log('I\'m invoked in any case after success/error');
    }
  });
}
/**
 *
 * @param item {Element} playlist-item
 */
function prepareItem(item) {
  item.addEventListener('click', function () {

  });
}

function createItem(name, token, songCount) {
  var listItem =
    '<li class="list-group-item playlist-item" data-id="' + token + '">' +
    '<div class="col-md-6">' + name + '</div>' +
    '<div class="col-md-6">' + songCount + '</div>' +
    '</li>';
  playlistParent.innerHTML += listItem;
}