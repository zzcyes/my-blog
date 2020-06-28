import HelloWorld from './class/HelloWorld';
import Person from './class/Person';

const hw = new HelloWorld();
const mine = new Person("zzc", 24);
const name = mine.getName();
hw.sayHello(name);
