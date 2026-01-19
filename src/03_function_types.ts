// -------------------------
// 함수의 타입 정의
// 함수 선언식
function sum(a: number, b: number): number {
    return a + b;
}
// 함수 표현식
const sum2 = (a: number, b: number): number => a + b;

// -------------------------
// 선택적 파라미터
function print1(name: string, age?: number): void {
    console.log(`${name}: ${age}`);
}
print1('홍길동');
print1('홍길동', 20);

// 필수 파라미터가 선택적 파라미터보다 뒤에 작성되면 안된다.
function print2(name: string, age?: number, gender: string): void {
    console.log(`${name}: ${age}: ${gender}`);
}

// -------------------------
// Rest 파라미터
function sumAll(...numbers: number[]): number {
    // [1, 2, 3, ...] 어떻게 다 더할 것인가? 

    // 초기값 0을 설정하여 누적 합산 준비
    // let sum = 0;

    // for...of 루프를 사용하여 배열의 '값(value)'에 직접 접근
    // for (const val of numbers) {
    //     sum += val;              각 숫자를 순회하며 sum에 누적
    // }
    
    // 합산된 최종 결과값을 반환
    // return sum;

    // acc (Accumulator): 이전 루프까지 계산된 누적 값
    // curr (Current Value): 현재 배열에서 꺼낸 값
    // numbers.reduce((누적값, 현재값) => 결과, 초기값)
    // 1. 초기값(0)이 acc에 먼저 들어감
    // 2. 배열의 요소를 하나씩 curr에 담아 acc에 더함
    // 3. 최종적으로 하나로 응축(reduce)된 값을 반환
    return numbers.reduce((acc, curr) => acc + curr);
}
sumAll(1);
sumAll(1, 2);
sumAll(1, 2, 3, 4, 5);

// -------------------------
// 함수 타입 표현식
const add = (a: number, b: number): number => a + b; // 정의부
const sub = (a: number, b: number): number => a - b;
const mul = (a: number, b: number): number => a * b;
const div = (a: number, b: number): number => a / b;

// 위에 코드를 함수 타입 표현식으로 정의
type Oper = (a: number, b: number) => number;
const addEx: Oper = (a, b) => a + b; // 실행부
const subEx: Oper = (a, b) => a - b;
const mulEx: Oper = (a, b) => a * b;
const divEx: Oper = (a, b) => a / b;

// -------------------------
// 호출 시그니처: 객체 정의 안에 함수의 형태를 기술하는 방식
type Animal = {
    (name: string): void; // 함수의 호출 시그니처
    age: number;
}
const human: Animal = (name) => console.log(name);
human.age = 20;

// -------------------------
// 함수의 타입 호환성
// 리턴의 타입 호환성: 업캐스팅 일 때 호환이 가능
type FunA = (num: number) => number; // 들어갈 수 있는 요소 생각하기.
type FunB = (num: number) => 10;

let funA: FunA = num => num;
let funB: FunB = num => 10;
funA = funB;
funB = funA; // Error

// 파라미터의 타입 호환성: 다운 캐스팅에서 허용
type FunC = (num: number) => number;
type FunD = (num: 10) => number;
let funC: FunC = num => num;
let funD: FunD = num => num;
funC = funD; // Error
funD = funC;
funC(1);
funD(10);

// -------------------------
// 함수 오버로딩: 하나의 함수명에 여러개의 파라미터 조합을 선언하는 기능
// 1. 오버로드 시그니처: 구현부 없이 선언부만 만들어둔 함수
function addOver(a: number, b: number): number;
function addOver(a: number, b: number, c:number, d:number): number;

// 2. 구현 시그니처: 구현부를 정의하는 함수
function addOver(a: number, b: number, c?:number, d?:number): number {
    if(typeof c === 'number' && typeof d === 'number') {
        return a + b + c + d;
    } else {
        return a + b;
    }
}
addOver(1, 2);
addOver(1, 2, 3); // Error" 파라미터가 3개인 시그니처는 정의하지 않았으므로 에러 발생
addOver(1, 2, 3, 4);

// -------------------------
// 사용자 정의 타입 가드: `is` 키워드를 활용해서 타입을 좁히는 방법(되도록이면 서로소 유니온을 먼저 이용할 것)
type Cat = { meow: () => void; type: 'CAT'; };
type Dog = { bark: () => void; type: 'DOG'; };

// 1. 타입 가드 함수 정의
// 'animal is Cat'이라는 반환 타입을 통해 이 함수가 true를 리턴하면
// TypeScript는 이 변술를 Cat 타입으로 간주
function isCat(animal: Cat | Dog): animal is Cat {
    // (animal as Cat): 일단 Cat이라고 가정하고 속성을 검사
    // .meow !== undefined: Cat의 고유 속성인 meow가 있는지 확인
    return (animal as Cat).meow !== undefined;
}

// 2. 타입 가드를 활용한 조건문 처리
function speak(animal: Cat | Dog) {
    // if문에서 isCat을 호출
    if(isCat(animal)) {
        // [True일 때]: Typescript가 animal을 'cat'으로 확신
        // animal은 Dog의 속성을 잃고 Cat의 속성만 가짐
        animal.meow();
    } else {
        // [False일 때]: 'Cat | Dog' 중 Cat이 아님이 판명됨
        // 남은 타입인 'Dog'로 자동으로 좁혀짐
        animal.bark();
    }
}