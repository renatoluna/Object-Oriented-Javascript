// scripts/MYNAMESPACE/init.js
var namespace = new Namespace('MYNAMESPACE'); // Cria namespace no nível global
namespace.myClassA = new MyClassA(); // Adiciona as classes ao namespace

namespace.myClassA.init(); // inicializa um método público da classe equivalente à window.MYNAMESPACE.myClassA.init();
