- 데이터베이스 구조

typescript
interface Todo {
    id: string;           // UUID로 생성된 고유 식별자
    title: string;        // 할 일 제목
    description?: string; // 할 일 상세 설명 (선택사항)
    priority: 'high' | 'medium' | 'low'; // 우선순위
    isCompleted: boolean; // 완료 여부
    order: number;        // 정렬 순서
    createdAt: Timestamp; // 생성 시간
    updatedAt: Timestamp; // 수정 시간
}

### 데이터베이스 규칙 업데이트
1. 정렬 관련
   - order 필드 추가로 드래그 앤 드롭 순서 유지
   - batch update로 순서 변경 처리
   - order 필드 기준 오름차순 정렬

2. 성능 최적화
   - 복합 인덱스 생성: order, createdAt
   - 불필요한 실시간 리스너 제한
   - 페이지네이션 구현 준비

3. 보안 규칙

javascript
rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /todos/{document=} {
allow read, write: if true; // 현재는 개발을 위해 모든 접근 허용
// 추후 인증 구현 시 아래 규칙 적용
// allow read, write: if request.auth != null;
}
}
}

- 사용방법

### 1. 데이터 생성 (Create)
typescript
await addDoc(collection(db, 'todos'), {
title: '새로운 할 일',
priority: 'medium',
isCompleted: false,
createdAt: serverTimestamp(),
updatedAt: serverTimestamp()
});

### 2. 데이터 읽기 (Read)
typescript
// 전체 할 일 목록 가져오기
const querySnapshot = await getDocs(collection(db, 'todos'));
// 실시간 데이터 감지
onSnapshot(collection(db, 'todos'), (snapshot) => {
snapshot.docChanges().forEach((change) => {
if (change.type === 'added') {
// 새로운 할 일이 추가됨
}
if (change.type === 'modified') {
// 할 일이 수정됨
}
if (change.type === 'removed') {
// 할 일이 삭제됨
}
});
});

### 3. 데이터 수정 (Update)
typescript
await updateDoc(doc(db, 'todos', todoId), {
title: '수정된 할 일',
updatedAt: serverTimestamp()
});

### 4. 데이터 삭제 (Delete)
typescript
await deleteDoc(doc(db, 'todos', todoId));

- 룰
### 1. 데이터 구조 규칙
- 모든 필드명은 camelCase로 작성
- 필수 필드 누락 없이 저장 (id, title, priority, isCompleted, createdAt, updatedAt)
- 날짜/시간 정보는 항상 Firestore Timestamp 사용

### 2. 쿼리 규칙
- 한 번에 가져오는 문서 수 제한 (페이지당 최대 20개)
- 정렬은 우선순위(priority) 및 생성일자(createdAt) 기준
- 복잡한 쿼리는 인덱스 생성 필수

### 3. 보안 규칙
javascript
rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /todos/{document=} {
allow read, write: if true; // 현재는 개발을 위해 모든 접근 허용
// 실제 운영 시에는 아래와 같이 보안 규칙 적용 필요
// allow read, write: if request.auth != null;
}
}
}

### 4. 성능 최적화 규칙
- 불필요한 실시간 리스너 사용 제한
- 대량의 문서 쿼리 시 페이지네이션 필수 사용
- 인덱스가 필요한 복잡한 쿼리 최소화


이 설계는 다음과 같은 특징을 가집니다:
1. 단일 컬렉션(todos)으로 간단하게 구성
2. 필수 필드와 선택적 필드를 명확히 구분
3. 타임스탬프를 통한 생성/수정 시간 추적
4. 우선순위 시스템 구현
5. 실시간 데이터 동기화 지원
6. 명확한 CRUD 작업 예시 제공
7. 확장성을 고려한 데이터베이스 규칙 설정

이 구조를 통해 PRD에서 요구하는 모든 기능을 효율적으로 구현할 수 있습니다.
