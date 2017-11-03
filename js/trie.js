function Trie(){
    this.isPrefix = false
    this.isWord = false
    this.children = []
}
Trie.prototype.addWord = function(word){
    if (word){
        this.isPrefix = true;
        (this.children[word.charAt(0)] || (this.children[word.charAt(0)] = new Trie()))
        .addWord(word.slice(1));
        console.log(this.children)
    }else
        this.isWord = true
}
Trie.prototype.addDictionary = function(arr){
    for (var i = 0; i < arr.length; i++) {
      this.addWord(arr[i]);
    };
}
Trie.prototype.findWord = function(word){
    if (word)
      return this.children[word.charAt(0)] ? this.children[word.charAt(0)].findWord(word.slice(1)) : null;
    else if (this.isWord) 
      return true;
}
Trie.prototype.findWordsWithPrefix = function(prefix){
    var foundWords = []
    var findNode = function(prefix) {
      if( !prefix && this.isPrefix )
        return this;
      return this.children[prefix.charAt(0)] ?
        findNode.call(this.children[prefix.charAt(0)],prefix.slice(1)) : null;
    }
     var findAllWords = function(node, prefix) {
      if( node.isWord )
        foundWords.push(prefix);
      if( node.isPrefix )
        for ( var letter in node.children )
          findAllWords(node.children[letter],prefix+letter); // deep search
    };

    (node = findNode.call(this,prefix) ) ? findAllWords(node, prefix) : null;    
    return foundWords;
  }
