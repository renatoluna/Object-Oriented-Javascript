/* ==========================================================================
    $ MySubModule2 Module
   ========================================================================== */
(function (namespace) {
	var mySubModule2;

	function MySubModule2 () {
	/* 
	    Internal scope namespaces
	   ========================================================================== */
		var $private = {};
		var $protected = this;
		var $public = $protected.constructor.prototype;

	/* 
	    Private attributes || methods
	   ========================================================================== */
	   	$private.version = '0.0.1';

	/* 
	    Public methods
	   ========================================================================== */
	   	$public.returnVersion = function () {
	   		return $private.version;
	   	}

		return $protected;
	}

/* ==========================================================================
    $ Self invoking function to make an autoinstance just for modules
   ========================================================================== */
	SCOPE.myModule1.mySubModule2 = mySubModule2 = (function () {
		return new MySubModule2();
	})();

	mySubModule2.fn = MySubModule2.prototype;

	return SCOPE.myModule1.mySubModule2;
})(SCOPE.myModule1); 