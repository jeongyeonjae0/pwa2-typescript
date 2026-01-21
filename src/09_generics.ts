// ------------------------------
// Generics

// 일반적인 함수일 경우
function fncNormal(val: any): any {
    return val;
}
let num1 = fncNormal(10);
num1.toUpperCase(); // 오류 감지 못함

// 제네릭스 이용해서 함수로 만들 경우
function fncGeneric<T>(val: T): T {
    return val;
}
let num2 = fncGeneric(10);
// num2.toUpperCase(); // 오류 감지

// -------------------------
// 제네릭 인터페이스
interface DropBox1<T> {
    val: T;
    selected: boolean;
}
const dropbox1: DropBox1<string> = { val: '1', selected: false };

interface DropBox2<T, U> { // 제네릭 타입은 중복되어서는 안됨
    val: T;
    selected: U;
}
const dropbox2: DropBox2<number, boolean> = { val: 1, selected: true };

// ---------------------------
// 클래스에서의 제너릭
class BoxNoraml {
    public kinds: string[] = [];

    public add(val: string): void {
        this.kinds.push(val);
    }

    public toString(): string {
        return this.kinds.toString();
    }
}
const boxNormal: BoxNoraml = new BoxNoraml();
boxNormal.add('test');
// boxNormal.add(1); // Error

class BoxGeneric<T> {
    public kinds: T[] = [];

    public add(val: T): void {
        this.kinds.push(val);
    }

    public toString(): string {
        return this.kinds.toString();
    }
}
const boxGeneric: BoxGeneric<number> = new BoxGeneric<number>();
boxGeneric.add(1);
const boxGeneric2: BoxGeneric<string> = new BoxGeneric<string>();
boxGeneric2.add('1');

// ----------------------
// 제너릭 제약조건: 제네릭에서 특정 조건을 만족하는 타입만 받도록 제한
interface RequiredLength {
    length: number;
}

function getLength<T extends RequiredLength>(arg: T): number {
    return arg.length;
}
getLength([]);
getLength('test');
// getLength(1); // Error