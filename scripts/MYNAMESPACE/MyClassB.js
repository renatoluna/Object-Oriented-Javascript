function MyClassB () {

    var $private = {}; // Criação de objeto literal ao qual os atributos e métodos privados estarão presentes.
    var $public = this; // Técnica de pulo de escopo com a finalidade de evitar problemas de sobreescrita dos valores presentes no this.

    /*
		Atributos e métodos públicos e privados
	*/
    $public.getElement = function (element) {
        return $private.element;
    };

    $public.setElement = function (tagName) {
        $private.element = $private.styleElement(document.createElement(tagName));
    };

    $private.styleElement = function (element) {
		if (element) {
            element.style.width = '200px';
    		element.style.height = '200px';
    		element.style.backgroundColor = '#F00000';
		}

		return element;
	};

}
