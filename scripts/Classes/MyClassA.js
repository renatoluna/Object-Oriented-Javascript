function MyClassA () {
	/*
	    Internal scope namespaces
 	*/
    var $private = {};
    var $public = this;

	/*
		Private and Public attributes or methods
	*/
	$private.myClassB = new MyClassB();
    $private.myClassB.setElement('div');

	$public.init = function () {
		$private.appendElement($private.myClassB.getElement());
	};

	$private.appendElement = function (element) {
	    document.body.appendChild(element);
	};

}
