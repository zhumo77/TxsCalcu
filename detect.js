(function () {
    
  function detectTonghua (suits) {
    for (var i = 0; i < suits.length; i++) {
      if (suits[i] === 5) {
        return true
      }
    }
    return false
  }

  function detectAllSingle (values) {
    for (var i = 0; i < values.length; i++) {
      if (values[i] > 1) {
        return false
      }
    }
    return true
  }

  function detectGaopai (suits, values) {
    if (!detectTonghua(suits) && !detectShunzi(values) && !detectAShunzi(values)) {
      for (var i = 0; i < values.length; i++) {
        if (values[i] > 1) {
          return false
        }
      }
      return true
    }
    return false
  }

  function detectShunzi (values) {
    var continueNum = 0
    for (var i = 0; i < values.length; i++) {
      if (values[i] === 1) {
        if (values[i + 1] === 1) {
          continueNum++
        }
      }
    }
    return (continueNum === 4)
  }

  function detectAShunzi (values) { // minStraight A,2,3,4,5
    return (values.join('') === '1000000001111')
  }

  function detectSitiao (values) {
    var maxNum = Math.max.apply(null, values)
    if (maxNum === 4) {
      return true
    }
    return false
  }

  function detectHulu (values) {
    var maxNum = Math.max.apply(null, values)
    var valuesCopy = values.slice(0)
    if (maxNum === 3) {
      valuesCopy[valuesCopy.indexOf(maxNum)] = 0
      if (Math.max.apply(null, valuesCopy) === 2) {
        return true
      }
    }
    return false
  }

  function detectSantiao (values) {
    var maxNum = Math.max.apply(null, values)
    var valuesCopy = values.slice(0)
    if (maxNum === 3) {
      valuesCopy[valuesCopy.indexOf(maxNum)] = 0
      if (Math.max.apply(null, valuesCopy) < 2) {
        return true
      }
    }
    return false
  }

  function detectLiangdui (values) {
    var maxNum = Math.max.apply(null, values)
    var valuesCopy = values.slice(0)
    if (maxNum === 2) {
      valuesCopy[valuesCopy.indexOf(maxNum)] = 0
      if (Math.max.apply(null, valuesCopy) === 2) {
        return true
      }
    }
    return false
  }

  function detectDuizi (values) {
    var maxNum = Math.max.apply(null, values)
    var valuesCopy = values.slice(0)
    if (maxNum === 2) {
      valuesCopy[valuesCopy.indexOf(maxNum)] = 0
      if (Math.max.apply(null, valuesCopy) < 2) {
        return true
      }
    }
    return false
  }

  function detect (arr) { // detectCompose levels[i]
    var high = 0 // begins nuts
    var arrValue = arr[1].join('')
    var myArrValue = parseInt(arrValue) // default high card

    function toNum (i) {
      return 12 - parseInt(arr[1].indexOf(i))
    }

    // if (detectGaopai(arr[0], arr[1])) { // high card compareable
    if (detectAllSingle(arr[1]) && !detectTonghua(arr[0]) && !detectShunzi(arr[1]) && !detectAShunzi(arr[1])) {
      return [high, myArrValue]
    } else if (detectDuizi(arr[1])) { // pair noncopareable
      high = 1
      myArrValue = high * 1e13 + toNum(2) * 1e11 + parseInt(arrValue) / 100
    } else if (detectLiangdui(arr[1])) { // two pairs noncopareable
      high = 2
      var arrCopy = arr[1].slice(0)
      arrCopy[arrCopy.indexOf(1)] = 0
      myArrValue = high * 1e13 + parseInt(arrCopy.join('')) + (toNum(1) / 100)
    } else if (detectSantiao(arr[1])) { // three kind noncopareable
      high = 3
      myArrValue = high * 1e13 + toNum(3) * 1e11 + parseInt(arrValue) / 100
    } else if (detectTonghua(arr[0])) { // flush same kind compareable
      if (detectShunzi(arr[1])) {
        high = 8
        myArrValue = high * 1e13 + parseInt(arrValue)
      } else if (detectAShunzi(arr[1])) {
        high = 8
        myArrValue = high * 1e13
      } else {
        high = 5
        myArrValue = high * 1e13 + parseInt(arrValue)
      }
    } else if (detectShunzi(arr[1])) { // straight compareable
      high = 4
      myArrValue = high * 1e13 + parseInt(arrValue)
    } else if (detectAShunzi(arr[1])) { // A,2,3,4,5
      high = 4
      myArrValue = high * 1e13
    } else if (detectHulu(arr[1])) { // full house compareable
      high = 6
      myArrValue = high * 1e13 + toNum(3) * 100 + toNum(2)
    } else if (detectSitiao(arr[1])) { // four kind noncompareable
      high = 7
      myArrValue = high * 1e13 + toNum(4) * 100 + toNum(1)
    }

    return [high, myArrValue]
  }

  window.detect = detect
})()
