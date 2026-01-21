// ---------------------------------------
// 타입 조작
// ---------------------------------------
// keyof & typeof 연산자
interface User {
    id: number;
    name: string;
    age: number;
}
// ('id' | 'name' | 'age') 유니온 타입으로 만들어짐
type UserKeys = keyof User;

const user = { name: '홍길동', age: 20 };
type User2 = typeof user;

// ---------------------------------------
// 인덱스드 엑세스 타입
// 객체, 배열, 튜플의 특정 요소나 속성의 타입을 추출할 때 사용
interface Post {
    title: String;
    content: string;
    author: {
        id: number;
        name: string;
        email: string;
    }
}
function printAuthorInfo1(author: { id: number; name: string; email: string; }): void {
    console.log(`${author.id}: ${author.name}`);
}
function printAuthorInfo2(author: Post['author']): void {
    console.log(`${author.id}: ${author.name}`);
}

// 배열 요소의 타입 추출
const COLORS = ['red', 'green', 'blue'] as const;
type Color = typeof COLORS[number]; // 배열의 값들을 유니온 타입으로 한 번에 추출

// 튜플의 요소 타입 추출
type Tuple = [number, string, boolean];
type Tup1 = Tuple[0] // number
type Tup2 = Tuple[1] // string
type Tup3 = Tuple[number] // string | number | boolean

// ---------------------------------------
// 맵드 타입 (Mapped Type)
// 기존의 타입을 기반으로 새로운 타입을 일괄 생성할 때 사용
type User3 = {
    id: number;
    name: string;
    age: number;
}

// 모든 속성을 옵셔녈로 바꾸고 싶다.
type OptionalUser4 = {
    [K in keyof User3]?: User3[K];
}

// 모든 속성을 readonly로 바꾸고 싶다.
type ReadonlyUser3 = {
    readonly[k in keyof User3]: User3[k];
}

// ---------------------------------------
// 템플릿 리터럴 타입(Template Literal Types)
// string literal 타입을 조합해서 새로운 string literal 타입을 생성
type Color2 = 'red' | 'green' | 'blue';
type Intensity = 'light' | 'dark';
type ColorTheme = `${Intensity}-${Color2}`; // 규칙적인 문자열 타입 작성 할 때 사용(css 등)