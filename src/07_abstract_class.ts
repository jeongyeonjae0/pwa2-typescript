// -------------------

abstract class Mammal {
    constructor(
        protected name: string,
        protected residence: string
    ) {
        this.name = name;
        this.residence = residence;
    }

    // 일반 메소드
    public breath(): void {
        console.log(`${this.name}이/가 폐호흡합니다.`);
    }

    // 추상 메소드: 자식쪽에서 반드시 오버라이딩 해야하는 메소드
    abstract printResdience(): void; // 구현부 없이 정의만
}

// 추상 클래스는 단독으로 인스턴스 생성이 불가능하다.
// const mammal: Mammal = new Mammal();

// 부모의 추상메소드를 반드시 오버라이드해서 구현해야지 오류가 나지 않는다.
class Whale extends Mammal {
    override printResdience(): void {
        console.log('하하');
    }
}