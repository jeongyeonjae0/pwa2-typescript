// -------------- Interface ------------------
interface Swimming {
    swimming(): void;
}

interface Flight {
    flying(): void;
}

// -------------- Mammal 관련 -----------------
abstract class Mammal {
    constructor(
        protected name: string
    ) {
        this.name = name;
    }

    // 추상 메소드
    abstract residence(): void;

    // 일반 메소드
    public breath(): void {
        console.log(`${this.name} 숨쉽니다.`);
    }
}

class Whale extends Mammal {
    override residence(): void {
        console.log(`${this.name} 바다에 삽니다.`);
    }

    swimming(): void {
        console.log(`${this.name} 수영한다.`);
    }
}

class FlyingSquirrel extends Mammal {
    override residence(): void {
        console.log(`${this.name} 산에 삽니다.`);
    }
}

// ------------------ Fish 관련 ------------------------
class FlyingFish implements Swimming, Flight {
    // 수영, 비행, 바다에 산다.
    swimming(): void {
        console.log(`날치 수영한다.`);
    }
    flying(): void {
        console.log(`날치 날다.`);
    }
}