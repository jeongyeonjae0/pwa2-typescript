// 타입 정의 방법
let num: number = 1;
let str: string = '1';

// number(정수형) 타입
let decimal: number = 7;          // 십진법 
let hex: number = 0xf00d;         // 16진수
let nan: number = NaN;            // 숫자가 아님
let infinity: number = Infinity;  // 무한대
let bigint: bigint = 100n;        // (ES2020+ 지원), 문서 볼 때 +있는지 확인 잘 하기

// string(문자열) 타입
let color: string = 'red';

// Literal(리터럴) 타입
// 해당 변수에 하나의 값만 들어간다.
let numLiteral: 1 = 1;
let strLiteral: 'a' = 'a';

// boolean(불리언) 타입
let bool: boolean = true;

// Array(배열) 타입
// 배열 요소 타입([]) 방식
let numList: number[] = [1, 2, 3, 4, 5];
let strList: string[] = ['a', 'b', 'c'];
// 제너릭 방식
let numList2: Array<number> = [1, 2, 3, 4, 5];
let dimensionalList: number[][] = [
    [1, 2, 3],
    [5, 6, 7],
];
let multiList: (number | string)[] = [1, '2'];

// Tuple(튜플) 타입
// 배열의 서브타입으로 크기와 타입이 고정된 배열
let x: [number, number] = [1, 1];
let x2: [boolean, number, string] = [true, 1, '1'];
// 외곽 쪽 부터, 안에 하나 씩 정의하는 방식
let x3: [number[], number] = [[1, 2, 3], 1];

// Object(객체) 타입
// object의 최상위 부모: Object
// let obj: object = {};                             // 최상위 객체로 데이터 타입으로 정의
// 많은 문제점
// let obj2: object = [];                            // 배열이 object를 상속받는 객체 중의 하나
// let obj3: object = function() {};                 // 함수도 object를 상속받는 객체 중의 하나
// let obj4: object = new Date();                    // date객체도 객체 
// let obj5: object = { name: '1', age: 20 };        // 정의 할 때는 통과
// object는 실제로 만들고자 하는 프로파티를 가지고 있지 않음.
// object는 부모, 내가 만들고자 하는 것은 자식 객체 
// 업 캐스팅: 구체적인 타입을 더 넓고 일반적인 타입으로 변환하는 것
// 부모 타입에 정의되지 않은 구체적인 정보(속성이나 메서드)에는 접근할 수 없게 된다.
// obj5.name;  

let obj6: { name: string, age: number } = { name: '홍길동', age: 20 };
obj6 = { name: '홍길동', age: 20 };

// Optional(선택적) 프로퍼티: 프로퍼티명 뒤에 ?를 붙여서 설정
// readonly(읽기전용) 프로퍼티: 프로퍼티명 앞에 `readonly` 키워드를 붙여서 설정
let obj7: { 
    readonly name: string, // 변경 불가능
    age: number, 
    gender?: string 
};
obj7 = { name: '홍길동', age: 20 };
obj7 = { name: '홍길동', age: 20, gender: 'M' };
// obj7.name = 'ttt'; 에러 발생

// ----------------------
// null & undefined 타입
// `strict` 모드가 아닌 경우, 모든 타입에 할당 가능. 되도록이면 비추천
// `strict` 모드 일 경우: 'any', 'unknown', `null`에만 할당 가능,  | 유니온 기능 활용
let objNull: { name: string, age: number } | null = null; // 두 타입의 합집합

// ----------------------
// Type Alias: 사용자가 정의하는 타입(타입명의 첫 글자는 대문자(파스칼 기법))
type User = {
    name: string;
    age: number;
};
const obj8: User = { name: '홍길동', age: 20};
const obj9: User = { name: '둘리', age: 50};

// ----------------------
// Index Signature: 객체의 타입을 유연하게 정의할 수 있도록 돕는 문법
// API 명세서를 명시적으로 작성한 다음, 명확하게 설정해서 안정성을 높임. 
type LangCodes = {
    KOREA: string;
    USA: string;
    JAPAN: string;
};
// 'KOREA'는 필수로 포함하되, 나머지 키와 값은 할당 시 자유롭게 추가할 수 있는 형태
// 외부에서 전달받은 값을 사용해야 할 때, 데이터가 어떤 요소들이 들어 있는지 확신하게 알 수 없을 때, 이용
type LangCodes2 = {
    [key: string]: string;
    KOREA: string;          // 반드시 포함되어야 하는 프로퍼티인 경우 직접 명시
};

const langCodes: LangCodes2 = {
    KOREA: 'kr',
    USA: 'en',
    CHINESE: 'ch',
};

// ----------------------
// enum(열거형) 타입
// 여러 값들에 각각 이름과 특정 값을 부여해두고, 사용하는 독립적인 타입
// 상황에 따라 다르게 이용 가능 

// 확장성은 높으나, 직관적이지는 않음.
enum Role {
    // 어떤 값으로 할당? 
    // 값은 정의한 순서대로 0부터 idx 자동으로 할당, 그러므로 정의한 순서도 중요!
    ADMIN,
    USER,
    GUEST,
}
const user1 = {
    name: '홍길동',
    role: Role.ADMIN, // 0
};
const user2 = {
    name: '둘리',
    role: Role.GUEST, // 2
};
console.log(Role[Role.ADMIN]); // 'ADMIN'

// 값을 별도의 고정값으로 지정해서도 사용 가능
enum Role2 {
    ADMIN = 'ADMIN',
    USER  = 'USER',
    GUEST = 'GUEST',
}
const user3 = {
    name: '또치',
    role: Role2.ADMIN, // 'ADMIN'
}

// ----------------------
// any 타입 : 모든 타입 허용
// let anyVal: any = 1; // Typescript를 쓰는 이유가 없어지므로 되도록 쓰지는 말자.

// Typescript가 추론해서 에러가 발생하지 않음. 
let anyVal: any = 1;

// Typescript 파라미터로 받을 때는 추론하지 못해서 에러 발생
// function test(any) {
//     console.log(any);
// }

// ----------------------
// unknown 타입 : 모든 타입 허용, 어떤 타입인지 모르기 때문에 함부로 연산(만들고자 로직 자체) 불가
// 존재하지 않는 속성이나 메서드에 접근해도 컴파일 에러가 발생하지 않아 런타임 오류 위험이 높음
let val1: any = 10;
// any처럼 무엇이든 담을 수 있지만, '타입 가드(Type Guard)'를 통해 타입을 확정하기 전까지는 속성 접근이나 연산이 불가
let val2: unknown = 10;
val1.length; // 컴파일 타임에 체크 안 함 -> 실행 시 undefined 또는 에러 발생
// val2.length;  무슨 타입인지 모르기 때문에 바로 접근 불가

// 타입을 좁히기(Type Narrowing) 위해 typeof, 비교문 등을 활용
if(typeof val2 === 'string') {
    val2.length;
}

// ----------------------
// void 타입 : 'undefined'만 할당이 가능한 타입, 
//             리턴 타입이 없는 함수에서 리턴 타입으로 사용
function test(): void {
    console.log('TEST!!!');
}

// ----------------------
// Algebraic Type : 복수의 타입을 합성해서 만드는 타입
// Union : 합집합, 복수의 타입을 허용하고 싶을 때, `|`를 통해 타입을 구분
// 주의 사항 : 시점에 따라서 사용 범위가 달라진다.
//     1. 할당 시점 : `A | B`의 필수 프로퍼티를 모두 가지고 있거나, 
//                   `A | B`의 모든 프로퍼티를 가지고 있으면 타입 검사 통과
//     2. 사용 시점 : `A | B`가 공통적으로 가진 프로퍼티만 사용 가능
let unionNumeric: number | string;
unionNumeric = '1';
if(typeof unionNumeric === 'string') {
    unionNumeric.length;
}
// Union 타입에서의 객체
type Human = {
    name: string;
    lang: string;
}
type Dog = {
    name: string;
    age: number;
}
type Animal = Human | Dog; // Animal Type: Union 타입

let test1: Animal = {
    name: '홍길동',
    lang: 'ko',
};
let test2: Animal = {
    name: '둘리',
    age: 40,
};
let test3: Animal = {
    name: '또치',
    age: 5,
    lang: 'ko',
}
test3.name;
test3.age;
test3.lang;
let test4: Animal = {
    name: '도우너',
}

// Intersection : 교집합
