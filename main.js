(function ($w, $d) {
  "use strict";


  function Binder(el){
    var $this = this;

    //Define $el property
    Object.defineProperty(this,'$el',{
      get:function(){
        // Return a true array instead of a NodeList
        return Array.prototype.map.call($d.querySelectorAll(el),function(element){
          return element;
        });
      }
    });

    this.$events = {};

    this.$on = function (event_name,cb,data) {
      if(!!event_name && !!cb){
        // Register event
        $this.$events[event_name] = new CustomEvent(event_name,data);

        // Add event listener
        this.forEach(function(item){
          item.addEventListener(event_name,cb, false);
        });
      }else{
        throw new Error("Too few parameters, expecting (String event_name,Function callback)!");
      }
    }.bind(this.$el);

    this.$trigger = function(event_name){
      if(!!event_name){
        // Dispatch Event
        this.forEach(function(item){
          item.dispatchEvent($this.$events[event_name]);
        });
      }else{
        throw new Error("Too few parameteres, expecting (String event_name)");
      }
    }.bind(this.$el);


  };

  Binder.prototype = new Object();
  Binder.prototype.constructor = Binder;


  $w.Binder = Binder;


})(window, document);
