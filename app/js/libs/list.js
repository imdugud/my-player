'use strict';
/**
 * @description gets playlists from json and sets as html elements within success
 */
function listPlaylists(parent, itemName) {
    var playlists = {};
    document.getJSON({
        url: '../data/playlists.json',
        success: function (json) {
            if (typeof json.err !== 'undefined') {//if file is empty
                playlistParent.innerHTML = 'There isn\'t any playlist.';
                return;
            }
            //create items
            playlists = json;
            for (let i = 0; i < playlists.length; i++) {
                createItem(parent, itemName,
                    playlists[i].name, playlists[i].token, playlists[i].songs.length);
            }
            //set events for playlist elements
            let items = document.querySelectorAll('.' + itemName);
            for (let i = 0; i < items.length; i++) {
                prepareItem(items[i]);
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
 * @param item {Element} playlist-item
 */
function prepareItem(item) {
    item.addEventListener('click', function () {

    });
}

/**
 * @description creates html element for each playlist
 * @param name
 * @param token
 * @param songCount
 * @param parent
 * @param itemName
 */
function createItem(parent, itemName, name, token, songCount) {
    var listItem = '<div class="nav-item u-category-windows ' + itemName + '"' +
        ' id="' + token + '"> <button type="button"' +
        ' class="nav-button button-playlist">' +
        name + ' - <em>' + songCount + '</em> </button>' +
        '</div>';
    parent.innerHTML += listItem;
}

//define for require js
define(function () {
    return function (groupName, itemName) {
        var playlistParent = document.getElementsByClassName(groupName)[0];
        return listPlaylists(playlistParent, itemName);
    }
});