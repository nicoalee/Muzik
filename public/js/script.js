$(document).ready(function () {
  $loadingDiv = $('#loadingDiv')
  $songList = $('.songList')

  $songList.on('click', '.addbttn', function (e) {
    e.preventDefault()
    const theBttn = $(this)
    var newSong = {
      name: theBttn.data('name'),
      artist: theBttn.data('artist'),
      album: theBttn.data('album')
    }

    $.post('/song', newSong).done(function (data) {
      if (data.status === 'ok') {
        alert(data.message)
      }
    })

    theBttn.parent().remove()
  })

  $('.songSearch').on('submit', function (e) {
    $loadingDiv.fadeIn()
    e.preventDefault()

    var keywordObj = $(this).serializeArray()
    var keyword = keywordObj[0].value
    var qString = `q=${keyword}`
    console.log(qString)
    console.log('token is ' + authToken)

    var options = {
      url: `https://api.spotify.com/v1/search?${qString}&type=track`,
      headers: {
        'Authorization': 'Bearer ' + authToken
      },
      json: true
    }

    $.ajax({
      url: `https://api.spotify.com/v1/search?${qString}&type=track`,
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + authToken
      },
      success: function (songData) {
        $loadingDiv.fadeOut()

        if ($songList.find('li').length) $songList.html('')

        console.log(songData.tracks.items)

        var songs = songData.tracks.items
        // create a list of songs to choose from

        songs.forEach(function (song) {
          var $newLi = $('<li class=borderlist>')
          var $newH2 = $('<h2>')
          var $album = $('<p>')
          var $artist = $('<p>')
          var $lineBreak = $('<br>')
          var $iframe = $(`<iframe frameborder=0 allowtransparency=true>`)

          $newH2.text(song.name)

          song.artists.forEach(function (artist) {
            $artist.append(document.createTextNode(artist.name + ' '))
          })

          var artistName = $artist.text()
          var $addBttn = $(`<button class='addbttn' data-name="${song.name}" data-artist="${artistName}" data-album="${song.album.name}">Add To Playlist</button>`)

          $album.text(song.album.name)
          console.log(song.uri)
          $newLi.append($newH2, $artist, $album, $iframe, $addBttn)
          $songList.append($newLi)
          $('iframe').last().attr('src', `https://open.spotify.com/embed?uri=${song.uri}`)
        })
      }
    })
  })
})
