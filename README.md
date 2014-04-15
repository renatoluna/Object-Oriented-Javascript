# Object Oriented Javascript #

**Prerequisite:** Basic knowledge in object oriented concepts.

Read more in [wikipedia](http://en.wikipedia.org/wiki/Object_Oriented "Object Oriented Article").

We all know that the ```javascript``` isn't an **full** object oriented program language, but, in order to make our work more simple and organized, was started an more modular way to work.

By now, our code will be more short and divided in more effective parts.


## Concept ##
Before start coding, let's undestand a little bit more about the proposed nomenclatures and, after, how it will work.

What it is     | How it's represented    | Name        | How to write
:--------------|:------------------------|:-----------:|:-----------:
**Scope**      | Literal Object ```{}``` | SCOPE       | UPPERCASE
**Module**     | ```function () {}```    | MyModule    | PascalCase
**Class**      | ```function () {}```    | MyClass     | PascalCase
**Sub Module** | ```function () {}```    | MySubModule | PascalCase
**Instances**  | Variables ```var```     | myInstance  | camelCase

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
 This is very cool and it works very well, but, by doing this, every single time that you uses the ```myClass``` variable into your code it was a reference to a instance of ```MyClass```. This could be very unusual in some contexts, like if you're trying to ```prototype``` some ***new method*** in the respective class and that's the reason why this concept was created.


## Getting Started ##
Let's begin creating an global object that will contains the global ```scope```. *By default it is suggested be named with the project´s name or the sponsor's organization name*. This is a good patrice for organization and to improve the memory management in code processing.

*From now, the initial comment in double slashes ```//``` will reference the name of the files in [scripts]("https://github.com/juliogc/oojavascript/tree/master/scripts") folder.*

``` javascript
// scope.js
var SCOPE = SCOPE || {};

window.SCOPE = SCOPE;
```

After this, we can use this global **scope** object to store all project instances. Be thorough now to define what wi'll be your **modules**, **classes** and **sub modules**. 

### Module ###
Is a big set of **classes**, or **sub modules**, that united will bring to us a large amount of features.

How a module will never be used, just your internal utilities, in javascript we can set up this in a self invoked function, so we can dispense the use of parenthesis ```()``` to make a instance on the module reference.

``` javascript
// scripts/modules/myModule1
```
