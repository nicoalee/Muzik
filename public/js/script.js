$(document).ready(function() {
  $loadingDiv = $('#loadingDiv')
  $songList = $('.songList')

  $('.removeSong').on('click', function(e) {
    e.preventDefault()
    const removeButton = $(this)
    var data = {
      songId: removeButton.data('songid'),
      playlistId: removeButton.data('playlistid')
    }
    // console.log(data)
    $.post('/song/delete', data).done(function(data) {
      if (data.status === 'ok') {
        location.reload()
      }
    })
  })

  $('.playlistEdit').on('click', function(e) {
    e.preventDefault()
    const editPlaylist = $(this)
    var data = {
      playlistId: editPlaylist.data('playlistid')
    }
    $.post('/playlist/edit', data).done(function (data){
      if(data.redirect){
        window.location = data.redirect
      }
    })
  })

  $('.playlist_delete').on('click', function(e) {
    e.preventDefault()
    var doubleCheck = confirm("Are you sure you want to delete a playlist?")
    if(doubleCheck){
      const removePlaylistButton = $(this)
      var data = {
        playlistId: removePlaylistButton.data('playlistid')
      }
      $.post('/playlist/delete', data).done(function(data) {
        if (data.status === 'ok') {
          location.reload()
        }
      })
    }
  })

  $songList.on('click', '.addbttn', function(e) {
    e.preventDefault()
    const theBttn = $(this)
    // console.log(theBttn)
    var newSong = {
      name: theBttn.data('name'),
      artist: theBttn.data('artist'),
      album: theBttn.data('album'),
      embed: theBttn.data('embed')
    }

    $.post('/song', newSong).done(function(data) {
      if (data.status === 'ok') {
        alert(data.message)
      }
    })

    theBttn.parent().remove()
  })

  $('.songSearch').on('submit', function(e) {
    $loadingDiv.fadeIn()
    e.preventDefault()

    var keywordObj = $(this).serializeArray()
    var keyword = keywordObj[0].value
    var qString = `q=${keyword}`

    // var options = {
    //   url: `https://api.spotify.com/v1/search?${qString}&type=track`,
    //   headers: {
    //     'Authorization': 'Bearer ' + authToken
    //   },
    //   json: true
    // }

    $.ajax({
      url: `https://api.spotify.com/v1/search?${qString}&type=track`,
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + authToken
      },
      success: function(songData) {
        $loadingDiv.fadeOut()

        if ($songList.find('li').length)
          $songList.html('')

        var songs = songData.tracks.items
        // create a list of songs to choose from

        songs.forEach(function(song) {
          var $newLi = $('<li class=borderlist>')
          var $newH2 = $('<h2>')
          var $album = $('<p>')
          var $artist = $('<p>')
          var $lineBreak = $('<br>')
          var $iframe = $(`<iframe frameborder=0 allowtransparency=true>`)

          $newH2.text(song.name)

          song.artists.forEach(function(artist) {
            $artist.append(document.createTextNode(artist.name + ' '))
          })

          var artistName = $artist.text()
          var embed = `https://open.spotify.com/embed?uri=${song.uri}`
          var $addBttn = $(`<button class='addbttn' data-name="${song.name}" data-artist="${artistName}" data-album="${song.album.name}" data-embed="${embed}">Add To Playlist</button>`)

          $album.text(song.album.name)
          $newLi.append($newH2, $artist, $album, $iframe, $addBttn)
          $songList.append($newLi)
          $('iframe').last().attr('src', embed)
        })
      }
    })
  })
})
