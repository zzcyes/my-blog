class Person {
    public name: String;
    public age: Number;

    constructor(name: String, age: number) {
        this.name = name || '';
        this.age = age || 0;
    }

    setAge(age: number): void {
        this.age = age;
    }

    setName(name: String): void {
        this.name = name;
    }

    getAge(): Number {
        return this.age;
    }

    getName(): String {
        return this.name;
    }
}

export default Person;

