// ---------------------------------
// 조건부 타입
// 특정 타입이 다른타입에 할당 가능한지 여부에 따라 타입을 결정
type IsString<T> = T extends string ? true : false;
type T1 = IsString<string>;
type T2 = IsString<number>;

// -----------------------
// 분산적 조건부 타입
// 제네릭에 유니온 타입을 전달하면,
// 유니온 타입의 각 요소를 하나씩 떼어내서 조건부를 적용하고 다시 합치는 타입
// -- 특정 타입을 유니온에서 제거하는 예제 --
type Exclude<T, U> = T extends U ? never : T;
type Result = Exclude<string | number | boolean, number>;
// (string | number | boolean) extends U ? never : T;
// (string extends U ? never : T;) | (number extends U ? never : T;) | (boolean extends U ? never : T;)
// string extends number ? never : string; // string
// number extends number ? never : number; // never
// boolean extends number ? never : boolean; // boolean
// string | boolean

// ---------------------------------
// infer 키워드
// 조건부 타입의 `extends`절에서 특정 타입을 추론하여 변수처럼 추출하고 싶을 때 사용
//   - 함수의 리턴 타입, 배열의 요소 타입을 추출하고 싶다.
// -- 리턴 타입을 추출하는 유틸리티 --
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
function getName() { return '홍길동'; }

type GetNameReturnType = GetReturnType<typeof getName>;

// -- 배열 요소의 타입 추출 --
type UnpackArray<T> = T extends (infer U)[] ? U : never;
type strArr = UnpackArray<string[]>;
type numArr = UnpackArray<number[]>;
type sArr = UnpackArray<'asdasd'>;