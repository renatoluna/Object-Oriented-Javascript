# Object Oriented Javascript #

**Prerequisite:** Basic knowledge in object oriented concepts.

Read more in [wikipedia](http://en.wikipedia.org/wiki/Object_Oriented "Object Oriented Article").

We all know that the ```javascript``` isn't an **full** object oriented program language, but, in order to make our workore simple and organized, was started an more modular way to work.

By now, our code will be more short and divided in more effective parts.


## Concept ##
Before start coding, let's undestand a little bit more about the proposed nomenclatures and, after, how it will work.

What it is     | How it's represented                                | Name        | How to write
:--------------|:----------------------------------------------------|:-----------:|:-----------:
**Scope**      | Literal Object ```{}```                             | SCOPE       | UPPERCASE
**Module**     | Imediatly-invoked function ```(function () {})()``` | MyModule    | PascalCase
**Sub Module** | Imediatly-invoked function ```(function () {})()``` | MySubModule | PascalCase
**Class**      | Regular function ```function () {}```               | MyClass     | PascalCase

In javascript community exists a very acceptable way to code classes or modules, like this:
``` javascript
// This sample was build simulating a class, but the same concept
// can be applied to modules and sub modules.

// Defining our class
function MyClass () {
    // logic goes here...
}

// Defining our instance
var myClass = new Class();
```
 This is very cool and it works fine. Doing this, each time you uses the ```myClass``` variable into your code it was building a instance of ```MyClass```. This could be very unusual in some contexts, like if you want to access the ```constructor``` to ```prototype``` some **new method** in the respective class and that's the reason why this concept was created.


## Getting Started ##
Let's begin creating an global object that will contains the global ```scope```. *By default it is suggested be named with the project´s name or the sponsor's organization name*. This is a good patrice for organization and to improve the memory management in code processing.

*From now, the initial comment in double slashes ```//``` will reference the name of the files in [scripts]("https://github.com/juliogc/oojavascript/tree/master/scripts") folder.*

``` javascript
// scripts/scope.js
(function (window, document, undefined) {
    var SCOPE = SCOPE || {};

    window.SCOPE = SCOPE;
    
    return window.SCOPE;
})(this, document);
```
This imediatly-invoked function takes the ```window``` object with main scope and puts a literal object that will serve to store our project instances in a global **scope**. After load this you'll be able to invoke```window.SCOPE``` or just ```SCOPE``` every time you need to use this.

Sample:
```
console.log(SCOPE);
// Object {}
```

Be thorough now to define what will be your **modules**, **sub modules** and **classes**. You define what's the importance for each one.


### Module ###
The module will be a sub division from our ```SCOPE``` project and will help to store a amount of **classes** and **sub modules**. Because of this, the **Modules** will ever be self instantiate with a imediatly-invoked function, so we can dispense the use of parenthesis ```()``` and make a cleaner organizational tree.

*Note: The closure function will take the SCOPE in the argument, not the global object ```window``` like we did before.*

``` javascript
// scripts/modules/MyModule1/MyModule1.js
(function (namespace) {
    function MyModule1 () {
        // logic here
    };
    
    SCOPE.MyModule1 = (function () {
        return new MyModule1();
    })();
    
    return SCOPE.MyModule1;
})(SCOPE);

console.log(SCOPE.MyModule1);
// MyModule1 {}
```

...

### Final ###
![Final structure](https://raw.githubusercontent.com/juliogc/oojavascript/master/images/final-structure.jpg)