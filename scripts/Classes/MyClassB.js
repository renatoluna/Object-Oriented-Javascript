function MyClassA () {
	/*
	    Internal scope namespaces
 	*/
    var $private = {};
    var $public = this;

	/*
		Private and Public attributes or methods
	*/
    $public.getElement = function (element) {
        return $private.element;
    };

    $public.setElement = function (tagName) {
        $private.element = $private.styleElement(document.createElement(tagName));
    };

    $private.styleElement = function (element) {
		if (!element) {
			return;
		}

		element.style.width = '200px';
		element.style.height = '200px';
		element.style.backgroundColor = '#F00000';
		return element;
	};

}
