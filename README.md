# Javascript Orientado a Objetos #

## Encapsulamentos ##

Quando se trabalha com orientação a objetos, e já que em Javascript as classes não existem, deve-se criar vários encapsulamentos para obter a vantagem de se ter vários pequenos escopos regionais, o que facilita com que as suas funções trabalhem com as suas variáveis locais dos mesmos ou de escopos externos cujos a mesmas estejam inseridas.

Exemplo:

```javascript
function add (x) {
    return function (y) {
        return x + y;
    };
}

var add5 = add(5);
/*
    No mundo JS o add5 na verdade significa:

    function (y) {
        return 5 + y;
    };
*/
var no8 = add5(3); // 8
```
Funções auto-executáveis

Em Javascript temos as self-invoking functions que são funções que são executadas imediatamente cujas criam os próprios encapsulamentos, exemplo:

```javascript
(function () {
    var duck = "Donald";
    alert(duck);
})();
```
Neste caso, a variável "duck" só está disponível no contexto desta função, ok, grande idéia esconder patos... Mas é aí que a brincadeira fica interessante, agora temos variáveis privadas, ou seja com o encapsulamento conseguimos criar formas de organizar mais o nosso código utilizando padrões mais avançados que facilitam a manutenção do mesmo e que otimizam o uso de recursos como no padrão que criamos através das nossas reuniões do comitê de desenvolvimento:

# Padrão de Javascript Orientado a Objetos #

- - -

**Pré-requisitos:** Conhecimento básico em orientação a objetos e javascript.

Leia mais em [wikipedia](http://pt.wikipedia.org/wiki/Orienta%C3%A7%C3%A3o_a_objetos "Orientação a objetos").

- - -

Como todos sabem, o ```javascript``` não possuí **classes** e isso é ótimo para esta linguagem em particular, mas essa situação é um grande causador de dúvidas/problemas/polêmicas para programadores experientes em outras linguagens.

Mesmo sendo diferente de outras linguagens clássicas na forma de implementar a orientação a objetos, o conceito é extamente o mesmo e fazemos isso visando uma forma de trabalhar que seja simples e organizada, para evitar um possível *code refactoring* ou métodos duplicados.

## Conceito ##
Todos sabemos que, no javascript, quase tudo é um objeto, até funções e expressões regulares. Um ```objeto``` é algo provido de características e faz determinadas coisas, comumente conhecidos como **propriedades** e **métodos**, respectivamente.

Também sabemos que o javascript é desprovido de **classes**, mas que a linguagem tem a capacidade de gerar novos objetos que herdem as propriedades de seus construtores, o que nos possibilita simular essa funcionalidade.

Atualmente, na comunidade javascript, já existe um modo aceitável de gerar classes e módulos, como o exemplo abaixo:
```javascript
// Exemplo de simulação de classe em JS
// Pode ser aplicado para criação de módulos também

// Definindo a classe
function MyClass () {
    // logic goes here...
}

// Gerando uma instância desta classe
var myClass = new Class();
```

Este código é bastante interessante e funciona bem. Ao fazer isso, cada vez que utilizar a variável ```myClass```, será feita uma referência a uma instância da classe ```MyClass```, dando acesso à todos os seus métodos públicos. Essa prática pode ser pouco usual em determinados contextos como, por exemplo, seja necessário realizar um ```prototype``` de um novo método diretamente no ```constructor``` da respectiva classe.

Antes de nos aprofundarmos nesta nova metodologia proposta de herança no javascript, vamos entender um pouco mais a funcionalidade de ```constructors```, ```prototype``` e da palavra restrita ```new```.

### O que é um ```construtor```? ###
Pode ser denominado como construtor qualquer função utilizada como construtora, a linguagem não faz uma distinção com relação a isso. Uma função pode ser utilizada com função de construtora, para ser chamada como uma função normal ou de ambos os jeitos.

O construtor padrão do javascript será sempre o objeto ```Window {}```.

```javascript
function MyClass () {
    var $public = this;

    $public.getConstructor = function () {
        console.log($public.constructor);
    };

    $public.getConstructor();
};

// O javascript interpreta esta construção como:
// window.MyClass = function () {...}

MyClass();
window.MyClass();
// Ambos mostram Window {} no console.
```

Trabalhar em cima do objeto window, conhecido por **escopo global**, sempre foi uma prática abominada por todos, seja pelo fato de não poluírmos um contexto que é comum, como também por questões de segurança da informação.

O único jeito de invocarmos o modo construtor é a partir da palavra ```new```.

### O que acontece quando um construtor é chamado? ###
Quando chamamos ```new MyClass()```, o javascript faz quatro coisas:

#### **1)** Cria um novo objeto: ####

Nenhuma execução em especial, apenas cria um novo objeto vazio: ```{}```.

#### **2)** Aponta a propriedade **construtora** deste objeto para a função utilizada (**MyClass**, neste exemplo): ####

Isso pode ser visto através de:
```javascript
var myClass = new MyClass();

myClass; // Retorna MyClass {} no console

myClass.constructor == MyClass // true
myClass instanceof MyClass // true
```

#### **3)** Delega a este novo objeto o ```MyClass.prototype```: ####

Uma ```Function``` é um tipo especial de objeto que, como qualquer objeto comum possui propriedades. Ao chamar uma função, ela ganha automaticamente uma propriedade chamada ```prototype```, que será um objeto literal ```{}``` onde serão armazenados todos os métodos e propriedades ditos como **públicos**, sendo identificados no escopo do próprio construtor pelo uso da palavra ```this```.

Caso não exista nenhum método ou propriedade no escopo público, será criado um objeto **vazio**. Significando então, que sempre existirá a propriedade ```prototype``` ao final da chamada de nossas funções, seja ele vazio ou contendo métodos e propriedades públicos.

```javascript
MyClass.prototype.version = 1.0.0;
var myClass = new MyClass();
myClass.version; // Exibe 1.0.0 no console
```

A instância ```myClass``` herdou do **prototype** de **MyClass** a propriedade ```version```.

#### **4)** É chamada a função ```MyClass``` no contexto do objeto que antes era vazio: ####
Lembrando do método ```getConstructor``` criado inicialmente em **MyClass** e utilizando ```new``` para gerar uma nova instância da nossa classe genérica, obteremos um log diferente, desta vez, que difere do objeto ```Window {}```.

```javascript
var myClass = new MyClass();
// Exibe no MyClass {} no console
```

Baseando-se no que foi dito, é possível aprofundar um pouco mais neste assunto que tem como objetivo final um código legível e organizado.


## Vamos começar ##
Olhando, desta vez, para o lado humano do javascript (programadores), foi criado um padrão de divisão, escrita e uso de cada instância que varia de acordo com suas referências.

Vamos a elas:

O que é        | Como será escrito                                     | Nome        | Modo de escrita
:--------------|:------------------------------------------------------|:-----------:|:--------------:
**Namespace**  | Literal Object ```{}```                               | NAMESPACE   | UPPERCASE
**Classe**     | Função anônima ```function () {}```                   | MyClass     | PascalCase

Primeiramente, começamos criando um objeto no nosso escopo global. Este objeto será a única intervenção feita no objeto ```Window {}``` e, a partir dele, estabeleceremos comunição interna entre as classes. Além de organizar, esta prática visa uma melhoria na gestão de memória durante o processamento do código.

**Para facilitar ao diferenciar dos métodos e propriedades padrões contidas no escopo global, é sugerido que o nome da variável que irá armazenar seja um acrônimo de 3 a 5 letras que se referencie ao nome do projeto ou organização mantenedora.**

*Para melhor entendimento, a partir de agora, o primeiro comentário do código a ser explicado será o nome de seu respectivo arquivo existente no diretório scripts.*

```javascript
// scripts/Namespace.js
function Namespace (packageName) {

    var $private = {};
    var $public = this;

    $public.init = function (packageName) {
        if (typeof packageName !== 'string') {
            return;
        }

        if (!window[packageName] === undefined || window[packageName].constructor !== Object) {
            window[packageName] = {};
        }

        window[packageName] = window[packageName] || {};
    };

    return $public.init(packageName);
}

```

```javascript
// scripts/MYNAMESPACE/init.js
var namespace = new Namespace('MYNAMESPACE'); // Cria namespace no nível global
namespace.myClassA = new MyClassA(); // Adiciona as instâncias das classes ao namespace

namespace.myClassA.init(); // inicializa um método público da classe equivalente à window.MYNAMESPACE.myClassA.init();
```
Nossa função inicial de encapsulamento recebe o nome do namespace que criará dentro do objeto ```Window {}``` como argumento e insere o objeto literal criado ```MYNAMESPACE {}``` que servirá para armazenar toda a lógica daqui em diante. Após isto, ficará disponível no escopo global o objeto ```window.MYNAMESPACE``` (ou somente ```MYNAMESPACE```) para cada vez que for necessário utilizá-lo, em seguida, nós adicionamos as instâncias das classes acessíveis ao namespace e inicializamos o nosso fluxo.

Exemplo:
```
console.log(MYNAMESPACE);
// Object {myClassA: MyClassA}
```

### Classes ###
Em orientação a objetos, uma classe é uma estrutura que unifica um conjunto de objetos com características similares, definindo o comportamento e estado de seus objetos através de métodos e atributos, portanto, é dentro de cada classe que deverá conter toda a lógica do projeto.

```javascript
// scripts/MYNAMESPACE/Classes/MyClassA.js
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
```

### Contexto interno ###
Ao trabalhar com construtores, é mais do que comum utilizar o ```this``` para manter o escopo de métodos ou propriedades que serão armazenados no ```prototype``` em sua construção e atribuido ao novo objeto quando gerada uma nova instância.

Por inúmeros motivos, é possível que o escopo do **this** se perca e acabe fazendo referência ao objeto ```Window {}``` ou a um método que esteja encapsulado neste mesmo contexto e, visando prevenir esse acontecimento, tornou-se uma boa prática utilizar a técnica de pulo de escopo (referenciar o escopo do **this** em uma variável).

Tendo como referência outras linguagens de programação, foram criadas duas variáveis de nomenclatura padronizada de acordo com a visibilidade de seus membros que são legíveis tanto para leigos quanto para programadores acostumados com outras linguagens.

```javascript
var $private = {};
var $public = this;
```

É de conhecimento comum que variáveis dentro de uma função só existirão em seu contexto interno e em tempo de execução, sendo inacessíveis fora dessas circunstâncias, já servindo como contexto "protegido", porém, ao se falar em processamento de dados, quanto mais variáveis foram instanciadas no desenvolvimento do código, mais lento será processado e, por este motivo, assumiremos essas três variáveis como únicas em nosso projeto, seja para armazenar métodos ou propriedades.

#### $private ####
Variável que faz referência a um objeto literal ```{}``` vazio e terá função de armazenamento de propriedades ou métodos que existirão apenas internamente na classe. Através de notações de objeto, é possível acrescentar facilmente novas informações neste contexto dito como privado.

```javascript
$private.version = '1.0.0';

$private['date'] = new Date();

$private.myInternalMethod = function () {...};
```

#### $public ####
Nasceu a partir da necessidade do pulo de escopo, no intuito de **proteger** o escopo interno, e tem a capacidade de tornar visível métodos ou propriedades em novas instâncias que serão herdeiras de determinada classe.  

Tem a capacidade de tornar disponível para classe e instâncias do objeto todos métodos e propriedades que forem declarados dentro deste contexto.
