$(document).ready(function () {
  $loadingDiv = $('#loadingDiv')

  $('.songSearch').on('submit', function (e) {
    $loadingDiv.fadeIn()
    e.preventDefault()

    var keywordObj = $(this).serializeArray()
    var keyword = keywordObj[0].value
    var qString = `q=${keyword}`
    console.log(qString)

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
        loadingDiv.fadeOut()
        // create a list of songs to choose from
      }
    })
  })
})
