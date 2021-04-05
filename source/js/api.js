const getData = function(url, onSuccess, onError) {
  fetch(url)
    .then(
      function(response) {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Не удалось загрузить данные о похожих объявлениях, попробуйте позже')
      },
    ).then(
      function(json) {
        onSuccess(json)
      },
    ).catch(
      function() {
        onError()
      },
    )
}

const sendData = function(url, onSuccess, onError, body) {
  fetch(
    url,
    {
      method: 'POST',
      body,
    },
  )
    .then(function(response) {
      if (response.ok) {
        onSuccess()
      }
      else {
        onError()
      }
    })
    .catch(function(){
      onError()
    })
}

export {getData, sendData};
