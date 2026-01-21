// -----------------------
// 유틸리티 타입
// 제너릭, 맵드 타입, 조건부 타입 등을 활용해서 타입스크립트가 미리 만들어둔 유틸리티
// 복잡한 타입조작을 직접 구현하지 않고 선언만으로 타입 변형 가능
interface User {
    id: number;
    name: string;
    email: string;
    gender?: 'M' | 'F';
    post: {
        id: number;
        title: string;
    }
}

// --------------------------------------
// Partial<T> : 타입 T의 모든 속성을 옵셔녈로 변경
type PartialUser = Partial<User>;

// --------------------------------------
// Required<T> : 타입 T의 모든 속성을 필수 속성으로 변경
type RequiredUser = Required<User>;

// --------------------------------------
// Readonly<T> : 타입 T의 모든 속성을 읽기 전용으로 변경
type ReadonlyUser = Readonly<User>;

// --------------------------------------
// Pick<T, K> : 타입 T에서 특정 속성 K들만 골라서 새로운 타입 작성
type Post = Pick<User, 'id' | 'name'>;

// --------------------------------------
// Omit<T, K> : 타입 T에서 특정 속성 K들만 골라서 제외하고 새로운 타입 작성
type OnlyUser = Omit<User, 'post'>;

// --------------------------------------
// Extract<T, U> : 유니온 타입 T에서 U와 겹치는 타입만 추출하여 새로운 타입 작성
type UnionType = string | number | boolean;
type ExtractType = Extract<string | number | boolean, string>;

// --------------------------------------
// ReturnType<T> : 함수 T의 리턴 타입을 추출하여 새로운 타입을 작성
function test() { return 'test'}
type TestReturnType = ReturnType<typeof test>;
