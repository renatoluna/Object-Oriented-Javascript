# Javascript Orientado a Objetos #

- - -

**Pré-requisitos:** Conhecimento básico em orientação a objetos e javascript.

Leia mais em [wikipedia](http://en.wikipedia.org/wiki/Object_Oriented "Object Oriented Article").

- - - 

Como todos sabem, o ```javascript``` não possuí **classes** e isso é ótimo para esta linguagem em particular, mas essa situação é um grande causador de dúvidas/problemas/polêmicas para programadores experientes em outras linguagens.

Mesmo sendo diferente de outras linguagens clássicas na forma de implementar a orientação a objetos, o conceito é extamente o mesmo e fazemos isso visando uma forma de trabalhar que seja simples e organizada, para evitar um possível *code refactoring* ou métodos duplicados.

## Conceito ##
Todos sabemos que, no javascript, quase tudo é um objeto, até funções e expreções regulares. Um ```objeto``` é algo provido de características e faz determinadas coisas, comumente conhecidos como **propriedades** e **métodos**, respectivamente.

Também sabemos que o javascript é desprovido de **classes**, mas que a linguagem tem a capacidade de gerar novos objetos que herdem as propriedades de seus construtores, o que nos possibilita simular essa funcionalidade.

Atualmente, na comunidade javascript, já existe um modo aceitável de gerar classes e módulos, como o exemplo abaixo:
``` javascript
// Exemplo de simulação de classe em JS
// Pode ser aplicado para criação de módulos também

// Definindo a classe
function MyClass () {
    // logic goes here...
}

// Gerando uma instância desta classe
var myClass = new Class();
```

Este código é bastante interessante e funciona bem. Ao fazer isso, cada vez que utilizar a variável ```myClass```, será feita uma referência a uma insância da classe ```MyClass```, dando acesso à todos os seus métodos públicos. Essa prática pode ser pouco usual em determinados contextos como, por exemplo, seja necessário realizar um ```prototype``` de um novo método diretamente no ```constructor``` da respectiva classe.

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
Lembrando do método ```getConstructor``` criado inicialmente em **MyClass** e utilizando ```new``` para criarmos uma nova instância da nossa classe genérica, obteremos um log diferente de ```Window {}```.

```javascript
var myClass = new MyClass();
// Exibe no MyClass {} no console
```