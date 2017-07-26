$(document).ready(function () {
  $('.songSearch').on('submit', function (e) {
    e.preventDefault()

    var keywordObj = $(this).serializeArray()
    var keyword = keywordObj[0].value
    var qString = `q=${keyword}`
    console.log(qString)

    var clientidbase64Encoded = btoa('35720c63c34e473e86effb4ec62bf825:56342bdc9b564d5a85e5f27db75710dd')
    console.log(clientidbase64Encoded)
    $.ajax({
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      data: {
        clientId: clientidbase64Encoded,
        clientSecret: clientSecretbase64Encoded,
        grant_type: 'client_credentials'
      }
    })
  })
})
