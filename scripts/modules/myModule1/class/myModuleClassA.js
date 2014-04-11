/* ==========================================================================
    $ MyModuleClassA Class
   ========================================================================== */
(function (namespace) {
	var myModuleClassA;

	function MyModuleClassA (element) {
	/* 
	    Internal scope namespaces
	   ========================================================================== */
		var $private = {};
		var $protected = this;
		var $public = $protected.constructor.prototype;

	/* 
	    Private attributes || methods
	   ========================================================================== */
	   	$private.element = document.createElement(element);

	   	$private.styleElement = function (element) {
	   		if (!element) return;

	   		element.style.width = '200px';
	   		element.style.height = '200px';
	   		element.style.background = 'red';

	   		return element;
	   	}

	/* 
	    Public methods
	   ========================================================================== */
	   	$public.appendElement = function () {
	   		var myElement = $private.styleElement($private.element);
	   		window.el = myElement;
	   		return document.body.appendChild(myElement);
	   	}

		if (!element) console.log('You must define and element to be created');
		if (element) console.log('Your element is %s', $private.element);

		return $protected;
	}

/* ==========================================================================
    $ Not a self invoking function, the instance will depend with the usage
   ========================================================================== */
	SCOPE.myModule1.myModuleClassA = myModuleClassA = function (element) {
		return new MyModuleClassA(element);
	};

	myModuleClassA.fn = MyModuleClassA.prototype;

	return SCOPE.myModule1.myModuleClassA
})(SCOPE.myModule1); 