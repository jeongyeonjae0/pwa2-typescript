// -------------------------
// 타입스크립트의 집합론
// 집합: 동일한 속성을 갖는 여러개의 요소들을 하나의 그룹으로 묶은 단위
// number: -1, 0, 2, 5... (무한집합)
// boolean: ture, false   (유한집합)
// string: 'a', 'bbb'...
// 객체 내부의 구조(Property)를 기준으로 타입을 결정하는 구조적 타입 시스템
// superset(넓은 범위 타입(여러 타입들을 허용할 수 있다.))
// subset

type Animal = {
    name: string;
}
type Human = {
    type: 'HUMAN';  // 리터럴 데이터 타입으로 셋팅
    name: string;
    lang: string;
}
type Dog = {
    type: 'DOG';    // 리터럴 데이터 타입으로 셋팅
    name: string;
    age: number;
}

// -------------------------
// 타입 호환성: A와 B 두개의 타입이 존재할 때, A타입의 값을 B타입으로 취급해도 괜찮은지 판단하는 것
let num1: number = 1; // 무한집합, -1, 0, 1...는 2에 넣을 수 없다.
let num2: 2 = 2;      // 유한집합, 2는 부분집합으로 속할 수 있다.
num1 = num2; // 호환 가능
// num2 = num1; // 호환 불가능

// const dog: Dog = { name: '흰둥이', age: 20 };
// 할당 시점: Animal의 조건 - name이라는 프로퍼티를 가지고 있느냐?, dog은 name을 가지고 있어서 통과
// const animal: Animal = dog;
// 자식 타입을 부모 타입으로 취급을 한다: Upcasting
// animal.name;
// animal.age; // Animal.age는 없는 프로퍼티
// const dog2: Dog = animal; // Downcasting은 비허용

// -------------------------
// 초과 속성 체크
// 객체 리터럴을 직접 대입하는 상황에서 실수 방지를 위해 더 엄격하게 체크
// const animal2: Animal = { name: '검둥이', age: 20 };

// -------------------------
// 타입 추론: 명시적으로 타입을 적지 않아도, 타입스크립트가 코드를 분석해서 타입을 결정하는 기능
// 일반 변수의 타입추론
let num3 = 1; // number로 타입 추론
const num4 = 1; // 1 number literal로 타입 추론

// 객체의 타입 추론
let obj = { name: '홍길동', age: 20 };
// obj = { lang: 'ko' }; // error

// 구조 분해 할당의 타입 추론
// let [num5, str5, bool5]: [number, string, boolean] = [1, 'str', true];
let [num5, str5, bool5] = [1, 'str', true];

// 함수의 리턴 타입 추론
function test1(a: number, b: number) {
    return a + b;
}
// 기본값이 설정된 파라미터의 타입 추론
function test2(msg = 'test') {
    return 'hi';
}
// 최적 공통 타입 추론
// let arr: (number | string | boolean)[] = [1, 'hi', false];
let arr = [1, 'hi', false];

// -------------------------
// 타입 단언: 개발자가 해당 타입에 대해 확실한 정보를 가지고 있을때,
//           컴파일러에게 특정 타입을 강제로 지정하는 기능
let num6 = 10 as never;
// let num7 = 10 as string; // 슈퍼셋 또는 서브셋이 아닌 타입으로는 단언 불가능

// 백엔드에서 사용할 일이 없지만, 프론트에서는 한번씩 사용할 일이 있다.
const main = document.querySelector('main') as HTMLElement;                                       

// Non-null 단언 연산자: 값이 null이나 undefined가 아님을 확신 할 때, `!`를 이용해서 타입 단언
type User = {
    name: String;
    age?: number;
};
const user: User = { name: '홍길동' };
user.name.toString();

// 차이
user.age?.toString();
user.age!.toString();

// const 단언: 모든 프로퍼티가 readonly를 갖도록 단언 가능
let user2 = {
    name: '둘리',
    age: 40,
} as const;

// -------------------------
// 타입 좁히기: 여러 타입이 섞여 있는 상황에서, 조건문을 통해 특정 범위로 타입을 제한
function printVal(val: number | string | null): void {
    if(typeof val === 'number') {
        console.log(val.toFixed(2));
    } else if(typeof val === 'string') {
        console.log(val.toUpperCase());
    } else {
        console.log('null이다.');
    }
}

// 객체의 타입 좁히기: `in`연산자 이용
function whatIsKinds(animal: Human | Dog) {
// 객체 안에 이 이름을 가진 프로퍼티가 있나?
    if('lang' in animal) {
        animal.lang;
    } else {
        animal.age;
    }
}

// 클래스 인스턴스 좁히기: `instance of` 연산자
class Dog2 { bark: string = '멍'; }
class Cat2 { walk: string = '사뿐사뿐'; }
function chkClass(animal: Dog2 | Cat2) {
    if(animal instanceof Dog2) {
        animal.bark;
    } else {
        animal.walk;
    }
}

// 서로소 유니온이 성립하려면, 각 타입을 구분할 수 있는 판별자(Discriminator)가 필요.
// 1. 값의 구체성(Literal vs String)
// type 필드: 'HUMAN' 또는 'DOG'라는 리터럴 타입. 값이 딱 정해져 있다.
// name 필드: 단순히 string 타입, 무한한 가능성을 가진 범용적인 타입
// 2. 구조적 타이핑의 중복
// 서로소 유니온이 되려면 각 타입이 가진 판별자 값이 서로 겹치지 않는(Disjoint) 상태여야 한다.

// 서로소 유니온 타입 좁히기
// 1. 판별자 선정: 리터럴 타입(String, Number 등)을 가진 공통 속성을 가진다.
// 2. 이름 주의: DB 예약어나 라이브러리 충돌 방지를 위해 사용하지 않기.
// 3. 타입 좁히기: if/else 보다는 switch문을 사용하여 가독성과 확장성 고려하기.
function test3(animal: Dog | Human) {
    if(animal.type === 'HUMAN') {
        animal.lang;
    } else {
        animal.age;
    }
}