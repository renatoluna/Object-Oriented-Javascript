function MyClassA () {

    var $private = {}; // Criação de objeto literal ao qual os atributos e métodos privados estarão presentes.
    var $public = this; // Técnica de pulo de escopo com a finalidade de evitar problemas de sobreescrita dos valores presentes no this.

	/*
		Atributos e métodos públicos e privados
	*/
	$private.myClassB = new MyClassB(); // Instância de outra classe sendo armazenada dentro de um atributo privado.
    $private.myClassB.setElement('div'); // Utilização de método púbico de uma instância de outra classe;

    // Método público
	$public.init = function () {
		$private.appendElement($private.myClassB.getElement());
	};

    // Método privado
	$private.appendElement = function (element) {
	    document.body.appendChild(element);
	};

}
