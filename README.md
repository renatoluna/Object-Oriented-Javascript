# Javascript Orientado a Objetos #

- - -

**Pré-requisitos:** Conhecimento básico em orientação a objetos e javascript.

Leia mais em [wikipedia](http://pt.wikipedia.org/wiki/Orienta%C3%A7%C3%A3o_a_objetos "Orientação a objetos").

- - - 

Como todos sabem, o ```javascript``` não possuí **classes** e isso é ótimo para esta linguagem em particular, mas essa situação é um grande causador de dúvidas/problemas/polêmicas para programadores experientes em outras linguagens.

Mesmo sendo diferente de outras linguagens clássicas na forma de implementar a orientação a objetos, o conceito é extamente o mesmo e fazemos isso visando uma forma de trabalhar que seja simples e organizada, para evitar um possível *code refactoring* ou métodos duplicados.

## Conceito ##
Todos sabemos que, no javascript, quase tudo é um objeto, até funções e expreções regulares. Um ```objeto``` é algo provido de características e faz determinadas coisas, comumente conhecidos como **propriedades** e **métodos**, respectivamente.

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

Antes de nos aprofundarmos nesta nova metodologia proposta de herança no javascritp, vamos entender um pouco mais a funcionalidade de ```constructors```, ```prototype``` e da palavra restrita ```new```.

### O que é um ```construtor```? ###
Pode ser denominado como construtor qualquer função utilizada como construtora, a linguagem não faz uma distinção com relação a isso. Uma função pode ser utilizada com função de construtora, para ser chamada como uma função normal ou de ambos os jeitos.

O construtor padrão do javascript será sempre o objeto ```Window {}```.

```javascript
function MyClass () {
    var $protected = this;
    
    function getConstructor () {
        console.log($protected.constructor);
    };

    getConstructor();
    
    return $protected;
};

// O javascript interpreta esta construção como:
// window.MyClass = function () {...}

MyClass();
window.MyClass();
// Ambos mostram Window {} no console.
```

Trabalhar em cima do objeto window, conhecido por **escopo global**, sempre foi uma prática abominada por todos, seja pelo fato de não poluírmos um contexto que é comum a todos como, também, por questões de segurança da informção.

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

Caso não exista nenhum método ou propriedade no escopo público, será criado um objeto **vazio**. Significando, então, que sempre existirá a propriedade ```prototype``` ao final da chamada de nossas funções, seja ele vazio ou contendo métodos e propriedades públicos.

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
**Escopo**     | Literal Object ```{}```                               | SCOPE       | UPPERCASE
**Módulo**     | Função anônima auto-invocada ```(function () {})()``` | MyModule    | PascalCase
**Sub Módulo** | Função anônima auto-invocada ```(function () {})()``` | MySubModule | PascalCase
**Classe**     | Função anônima ```function () {}```                   | MyClass     | PascalCase

Primeiramente, começamos criando um objeto no nosso escopo global. Este objeto será a única intervenção feita no objeto ```Window {}``` e, a partir dele, estabeleceremos comunição interna entre os ditos módulos, sub módulos e classes. Além de organizar, esta prática visa uma melhoria na gestão de memória durante o processamento do código.

**Para facilitar ao diferenciar dos métodos e propriedades padrões contidas no escopo global, é sugerido que o nome da variável que irá armazenar seja um acrônimo de 3 a 5 letras que se referencie ao nome do projeto ou orgaização mantenedora.**

*Para melhor entendimento, a partir de agora, o primeiro comentário do código a ser explicado será o nome de seu respectivo arquivo existente no diretório [scripts]("https://github.com/juliogc/oojavascript/tree/master/scripts").*

```javascript
// scripts/scope.js
(function (window, document, undefined) {
    var SCOPE = SCOPE || {};

    window.SCOPE = SCOPE;
    
    return window.SCOPE;
})(this, document);
```
Nossa função inicial de encapsulamento recebe o o objeto ```Window {}``` como argumento e insere o objeto literal criado ```SCOPE {}``` que servirá para armazenar toda a lógica daqui em diante. Apos isto, ficará disponível no escopo global o objeto ```window.SCOPE``` (ou somente ```SCOPE```) para cada vez que for necessário utilizá-lo.

Exemplo:
```
console.log(SCOPE);
// Object {}
```

### Módulos e Sub Módulos ###
Os módulos e/ou sub módulos serão uma sub divisão do ```SCOPE {}``` e terá como única função a de agrupar e armazenar classes referentes ao mesmo contexto do fluxo de trabalho. Por conta disso, os módulos serão definidos por funções anônimas auto-invocadas, sendo dispensável o uso de parenteses ```()``` em sua instância para se gerar uma árvore organizacional mais limpa.

*Nota: Observe que, desta vez, a função de encapsulamento receberá o objeto SCOPE como argumento, ao invés de Window, como foi feito anteriormente.*

```javascript
// scripts/modules/MyModule1/MyModule1.js
(function (namespace) {
    function MyModule1 () {
        var $private = {};
        var $protected = this;
        var $public = $protected.constructor.prototype;
        // logic here
    };
    
    SCOPE.MyModule1 = (function () {
        return new MyModule1();
    })();
    
    SCOPE.MyModule1.fn = MyModule1.prototype;
    
    return SCOPE.MyModule1;
})(SCOPE);

console.log(SCOPE.MyModule1);
// MyModule1 {}
```

Geralmente, a organização do trabalho fica estabelecida em uma simples árvore organizacional como:

```bash
SCOPE
    - Module1
        - ClassA
        - ClassB
        - ClassC
    - Module2
        - ClassD
        - ClassE
        - ClassG
```

Dependendo da complexidade do nosso fluxo de trabalho, pode ser que exista a necessidade de uma divisão interna minusciosa, nascendo subdivisões em cada módulo:

```bash
SCOPE
    - AwesomeModule1
        - SubMobule1
            - ClassA
            - ClassB
            - ClassC
        - SubMobule2
            - ClassD
            - ClassE
    - AwesomeModule2
        - SubMobule3
            - ClassF
            - ClassG
            - ClassH
        - SubMobule4
            - ClassI
            - ClassJ
```

E, a partir disto, que será necessário gerar os sub módulos:

```javascript
// scripts/modules/myModule1/subModules/mySubModule1/mySubModule1.js
(function (namespace) {
    function MySubModule1 () {
        var $private = {};
        var $protected = this;
        var $public = $protected.constructor.prototype;
        // Logic here
    }

    SCOPE.MyModule1.MySubModule1 = (function () {
        return new MySubModule1();
    })();

    SCOPE.MyModule1.MySubModule1.fn = MySubModule1.prototype;

    return SCOPE.MyModule1.MySubModule1;
})(SCOPE.MyModule1); 

console.log(SCOPE.MyModule1.MySubModule1);
// MySubModule1 {}
```

### Classes ###
Em orientação a objetos, uma classe é uma estrutura que unifica um conjunto de objetos com características similares, definindo o comportamento e estado de seus objetos através de métodos e atributos, portanto, é dentro de cada classe que deverá conter toda a lógica do projeto.

```javascript
// scripts/modules/MyModule1/Classes/MyClassA.js
(function (namespace) {
    function MyModuleClassA (element) {
        var $private = {};
        var $protected = this;
        var $public = $protected.constructor.prototype;
        
        // Logic here
    }

    SCOPE.MyModule1.MyModuleClassA = function (element) {
        return new MyModuleClassA(element);
    };

    SCOPE.MyModule1.MyModuleClassA.fn = MyModuleClassA.prototype;

    return SCOPE.MyModule1.MyModuleClassA
})(SCOPE.MyModule1); 
```
*Observe que, na função de encapsulamento de classes, o módulo a que ela pertence será recebido como parâmetro principal do escopo.*

Ao trabalhar com classes, dispensa-se o uso de uma função anônima auto-invocada para gerar cada instância. É utilizada uma função anônima que deixa a cargo de seu utilizador o momento de criar a instância através do uso de parenteses ```()``` e declarar os respectivos argumentos, se assim a classe exigir.

### Contexto interno ###
Ao trabalhar com construtores, é mais do que comum utilizar o ```this``` para manter o escopo de métodos ou propriedades que serão armazenados no ```prototype``` em sua construção e atribuido ao novo objeto quando gerada uma nova instância.

Por inúmeras motivos, é possível que o escopo do **this** se perca e acabe fazendo referência ao objeto ```Window {}``` ou a um método que esteja encapsulado neste mesmo contexto e, visando prevenir esse acontecimento, tornou-se uma boa prática de referenciar este escopo em uma variável comumente nomeada de ```self```.

```javascript
var self = this;
```

Tendo como referência outras linguagens de programação, foram criadas três variáveis de nomenclatura padronizada de acordo com a visibilidade de seus membros que são legíveis tanto para leigos quanto para programadores acostumados com outras linguagens.

```javascript
var $private = {};
var $protected = this;
var $public = $protected.constructor.prototype;
```

É de conhecimento comum que variáveis dentro de uma função só existirão em seu contexto interno e em tempo de execução, sendo inacessíveis fora dessas circunstâncias, já servindo como contexto "protegido", porém, ao se falar em processamento de dados, quanto mais variáveis foram instanciadas no desenvolvimento do código, mais lento será processado e, por este motivo, assumiremos essas três variáveis como únicas em nosso projeto, seja para armazenar métodos ou propriedades.

#### $private ####
Variável que faz referência a um objeto literal ```{}``` vazio e terá função de armazenamento de propriedades ou métodos que existirção apenas internamente na classe. Através de notações de objeto, é possível acrescentar facilmente novas informações neste contexto dito como privado.

```javascript
$private.version = '1.0.0';

$private['date'] = new Date();

$private.myInternalMethod = function () {...};
```

#### $protected ####
Nasceu da mesma necessidade que o ```self```, no intuito de **proteger** o escopo interno, e tem a capacidade de tornar visivel métodos ou propriedades em novas instâncias que serão herdeiras de determinada classe. Apesar de sua existência, não o seu uso não é recomendável por questões de performance, sendo melhor substituido por ```$public```.

#### $public ####
Tem a capacidade de tornar disponível para classe e instâncias do objeto todos métodos e propriedades que forem declarados dentro deste contexto.

Esta varíavel é especial pois acessa diretamente o ```prototype``` do construtor da classe, agilizando o processamento de dados no momento em que é gerada a instância a partir da palavra ```new```.

Por fazer referência ao objeto ```prototype``` do construtor é utilizado através de notações de objeto:

```javascript
$public.log = function (argument) {
    return console.log(argument);
};

$public.getVersion = function () {
    return $public.log($private.version);
};

$public['showDate'] = function () {
    return $public.log($private['date'])
};
```

### .fn ###
Ao final de cada exemplo, foi deixado propositalmente uma linha que descrevia uma *dot notation* da instância a ser gerada, nomeada de ```fn```, que faz referência direta ao objeto ```prototype``` de seu construtor:

```javascript
SCOPE.MyModule1.MyModuleClassA.fn = MyModuleClassA.prototype;
```

Isso possibilita para que seja possível a adição de novos métodos ou propriedades diretamente no construtor por essa simples ligação com sua instância.

### Final ###
Estrutura final de um projeto fictício proposto com essa ideologia.

![Final structure](https://raw.githubusercontent.com/juliogc/oojavascript/master/images/final-structure.jpg)