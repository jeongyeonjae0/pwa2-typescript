// ----------------------------
// Class : 객체를 정의하기 위한 집합, 타입으로도 사용 가능
// 클래스명은 파스칼케이스로 작성
// 파일명은 클래스명과 동일하게 작성
// 기본적으로 한 시스템 내에서 클래스명은 중복 X

class Animal {
    // ------------
    // Field 정의
    // ------------
    // 인스턴스 필드
    public name: string = '동물';
    // 정적(static) 필드
    public static sName: string = '스테틱 이름';

    // --------------
    // 메소드 정의
    // --------------
    // 인스턴스 메소드
    public getName(): string {
        return '인스턴스 메소드';
    }

    // 정적 메소드
    public static getSName(): string {
        return '정적 메소드';
    }
}
// 정적 필드 접근
Animal.sName;
Animal.getSName();

// 인스턴스 필드 접근 
const animal: Animal = new Animal(); // 객체를 인스턴스 생성한 다음
// 인스턴스에 접근해서 사용
animal.name;
animal.getName();

// ----------------------------
// 생성자 메소드 : 객체가 생성될 때( = 인스턴스화 될 때) 자동으로 호출되는 특수한 메소드
// 주요 사용 : 객체의 필드(데이터)를 초기화 하거나, 생성 시점에 꼭 필요한 로직을 실행하기 위해 사용
// ----------------------------
class Whale {
    // public name: string;
    // 생성자 메소드
    // 객체를 인스턴스 생성시 실행되어야 하는 작업들을 위해서 사용
    // constructor(name: string) {
    //     [this.name] : 클래스로부터 만들어진 '현재 객체(인스턴스)'의 필드를 가리킴
    //     [name] : 외부(new Whale('라분'))에서 전달받은 '인자'값
    //     this.name = name; 
    //     [참고] 매개 변수가 없는 '기본 생성자'는 생략 가능
    // }

    // 생성자 단축 속성(Parameter propertise)
    // 생성자 파라미터 앞에 접근 제한자를 붙이면 필드 선언과 초기화를 한 번에 가능
    constructor(public name: string) {
        // ---------------
        // this 참조 변수
        // ---------------
        this.name = name;
        this.buu(); // 메소드도 this 참조 변수로 참조 가능
    }
    public static test(): void {
        console.log('test');
    }
    private buu() {
        console.log('buuu');
    }
}
const whale1: Whale = new Whale('라분');
const whale2: Whale = new Whale('상쾡이');

// ------------------------------
// 접근 제어 지시자
class Cat {
    // public: class 내외부 어디에서나 접근 가능(기본값)
    // private: class 내부에서만 접근 가능
    // protected: class 내부 또는 자식클래스에서만 접근이 가능
    // public만 생략 가능 (각 언어마다 생략이 다름)
    num1: number = 1;
    public num2: number = 2;
    private num3: number = 3;
    protected num4: number = 4;
}
const cat: Cat = new Cat();
cat.num1;
cat.num2;
// cat.num3; // error 
// cat.num4; // error

class CatChild extends Cat {
    test(): void {
        this.num4;
    }
}