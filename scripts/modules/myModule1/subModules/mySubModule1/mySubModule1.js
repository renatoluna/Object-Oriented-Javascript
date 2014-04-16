/* ==========================================================================
    $ MySubModule1 Module
   ========================================================================== */
(function (namespace) {
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
	SCOPE.MyModule1.MySubModule1 = (function () {
		return new MySubModule1();
	})();

	SCOPE.MyModule1.MySubModule1.fn = MySubModule1.prototype;

	return SCOPE.MyModule1.MySubModule1;
})(SCOPE.MyModule1); 