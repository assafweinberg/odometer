function Odometer(options) {
  this.options = options;
}

Odometer.prototype = {
  render: function(){
    var words = this.options.words;
    if(!words)
      return;

    this.maxLength = 0;
    for(var i = 0; i < words.length; i++){
      this.maxLength = Math.max(words[i].length, this.maxLength);
    }

    //get vertical letters
    var letters = [];
    for(var i = 0; i < this.maxLength; i++){
      letters.push([])
      for(var j = 0; j < words.length; j++) {
        var letter = words[j][i] || '&nbsp;';
        letters[i].push(letter);
      }
    }

    //Get column nodes
    var content = '';
    for(var i = 0; i < letters.length; i++) {
      var letterContent = '<div class="od-letter">' + letters[i].join('</div><div class="od-letter">') + '</div>';
      console.log(letterContent)
      //var letterContent = letterContent.substring(0,letterContent.length-24);

      content += '<div class="od-column">' + letterContent + '</div>'
    }

    this.options.el.innerHTML = content;
  },

  run: function() {
    var self = this;
    setInterval(function(){self._nextWord()}, 1000)
  },

  _nextWord: function() {
    var columns = document.getElementsByClassName('od-column');
    var existingTop = parseInt(columns[0].style.top) || 0;
    var nextTop = (Math.abs(existingTop) >= (columns[0].children.length-1)*100) ? 0 : (existingTop-100);
    for(var i = 0; i < columns.length; i++) {
      this._runOffset(columns[i], nextTop, i*100);
    }
  },

  _runOffset: function(column, newTop, delay) {
    setTimeout(function() {
      column.style.top = newTop + '%';
    },delay);
  }



}
