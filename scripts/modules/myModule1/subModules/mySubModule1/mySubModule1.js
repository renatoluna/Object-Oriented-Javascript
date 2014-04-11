/* ==========================================================================
    $ MySubModule1 Module
   ========================================================================== */
(function (namespace) {
	var mySubModule1;

	function MySubModule1 () {
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
	SCOPE.myModule1.mySubModule1 = mySubModule1 = (function () {
		return new MySubModule1();
	})();

	mySubModule1.fn = MySubModule1.prototype;

	return SCOPE.myModule1.mySubModule1;
})(SCOPE.myModule1); 