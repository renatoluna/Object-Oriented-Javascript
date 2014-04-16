/* ==========================================================================
    $ MyModule1 Module
   ========================================================================== */
(function (namespace) {
	function MyModule1 () {
	/* 
	    Internal scope namespaces
	   ========================================================================== */
		var $private = {};
		var $protected = this;
		var $public = $protected.constructor.prototype;

	/* 
	    Private attributes || methods
	   ========================================================================== */
		$private.version = '1.0.0';

		$private.method1 = function () {
			console.log('Running $private.method');
		}

	/* 
	    Public methods
	   ========================================================================== */
		$public.method2 = function () {
			console.log('A public method running a private method.');
			$private.method1();
		}

		$public.returnVersion = function () {
			return $private.version;
		}

		return $protected;
	}

/* ==========================================================================
    $ Self invoking function to make an autoinstance just for modules
   ========================================================================== */
	SCOPE.MyModule1 = (function () {
		return new MyModule1();
	})();

	SCOPE.MyModule1.fn = MyModule1.prototype;

	return SCOPE.MyModule1;
})(SCOPE);