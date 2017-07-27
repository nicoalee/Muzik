$(document).ready(function () {
  $('.songSearch').on('submit', function (e) {
    e.preventDefault()

    var keywordObj = $(this).serializeArray()
    var keyword = keywordObj[0].value
    var qString = `q=${keyword}`
    console.log(qString)
  })

  $.getJSON('/playlist/new', function (data) {
    console.log(data)
  })
})
