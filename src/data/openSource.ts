export type Platform = 'github' | 'gerrit'

export interface Contribution {
  date: string
  title: string
  summary: string
  url: string
  ref: string
  additions: number
  deletions: number
  changedFiles: number
}

export interface OpenSourceProject {
  name: string
  owner: string
  url: string
  platform: Platform
  description: string
  contributions: Contribution[]
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    name: 'mockk',
    owner: 'mockk',
    url: 'https://github.com/mockk/mockk',
    platform: 'github',
    description:
      'Kotlin 전용 모킹 라이브러리로, DSL 기반 API를 통해 코루틴·value class 등 Kotlin 고유 기능을 지원합니다. JVM·Android·Native 멀티플랫폼 타깃을 대상으로 합니다.',
    contributions: [
      {
        date: '2026.07.02',
        title: '제네릭 value class boxed 타입 파라미터 상한 경계 추론 버그 수정',
        summary: '제네릭 value class의 타입 파라미터 추론이 어긋나 발생하던 오동작을 수정했습니다.',
        url: 'https://github.com/mockk/mockk/pull/1541',
        ref: '#1541',
        additions: 81,
        deletions: 1,
        changedFiles: 2,
      },
      {
        date: '2026.07.02',
        title: 'value class 컨텍스트에서 TypedMatcher 타입 체크 보존',
        summary: '값 클래스를 처리하는 과정에서 사용자 정의 매처의 타입 검사가 건너뛰어지지 않도록 바로잡았습니다.',
        url: 'https://github.com/mockk/mockk/pull/1540',
        ref: '#1540',
        additions: 13,
        deletions: 4,
        changedFiles: 1,
      },
      {
        date: '2026.07.01',
        title: 'JVM 중첩 value class 매처 및 캡처 버그 수정',
        summary: '중첩된 value class를 사용할 때 스터빙과 인자 캡처가 동작하지 않던 문제를 해결했습니다.',
        url: 'https://github.com/mockk/mockk/pull/1539',
        ref: '#1539',
        additions: 111,
        deletions: 45,
        changedFiles: 5,
      },
      {
        date: '2026.06.03',
        title: 'clearAllMocks 플래그별 mock 타입 격리 버그 수정',
        summary: '특정 mock 종류만 초기화하도록 지정해도 전체가 초기화되던 문제를 수정했습니다.',
        url: 'https://github.com/mockk/mockk/pull/1533',
        ref: '#1533',
        additions: 137,
        deletions: 10,
        changedFiles: 5,
      },
      {
        date: '2026.05.30',
        title: 'value class nullable inner value null packRef 버그 수정',
        summary: 'value class의 내부 값이 null일 때 예외가 발생하던 문제를 해결했습니다.',
        url: 'https://github.com/mockk/mockk/pull/1532',
        ref: '#1532',
        additions: 84,
        deletions: 1,
        changedFiles: 3,
      },
      {
        date: '2026.05.23',
        title: 'AGP 8.5+ 환경에서 APK 내 네이티브 라이브러리 직접 추출 지원',
        summary: 'Android Gradle Plugin 8.5부터 패키징 방식이 바뀌며 네이티브 에이전트를 찾지 못하던 문제를 해결했습니다.',
        url: 'https://github.com/mockk/mockk/pull/1529',
        ref: '#1529',
        additions: 85,
        deletions: 1,
        changedFiles: 2,
      },
      {
        date: '2026.01.08',
        title: '중복 설정 로딩 최적화',
        summary: '두 곳으로 나뉘어 있던 설정 파일을 하나로 통합하고, 기존 경로는 폴백으로 남겼습니다.',
        url: 'https://github.com/mockk/mockk/pull/1474',
        ref: '#1474',
        additions: 163,
        deletions: 66,
        changedFiles: 11,
      },
    ],
  },
  {
    name: 'spring-security',
    owner: 'spring-projects',
    url: 'https://github.com/spring-projects/spring-security',
    platform: 'github',
    description:
      'Spring 생태계의 표준 인증·인가 프레임워크입니다. OAuth 2.1, SAML 2.0 등 주요 인증 프로토콜을 폭넓게 지원합니다.',
    contributions: [
      {
        date: '2026.08.12',
        title: 'setBeanResolver NullAway 임시 우회 코드 제거',
        summary: '상위 프레임워크가 널을 허용하게 되면서 필요 없어진 정적 분석 우회 코드를 걷어냈습니다.',
        url: 'https://github.com/spring-projects/spring-security/pull/19209',
        ref: '#19209',
        additions: 6,
        deletions: 26,
        changedFiles: 9,
      },
      {
        date: '2025.05.16',
        title: 'SAML 2.0 마이그레이션 가이드 문서 개선',
        summary: '위키에 흩어져 있던 마이그레이션 절차를 공식 레퍼런스 문서로 옮기고 예제를 정리했습니다.',
        url: 'https://github.com/spring-projects/spring-security/pull/17076',
        ref: '#17076',
        additions: 66,
        deletions: 0,
        changedFiles: 2,
      },
    ],
  },
  {
    name: 'thunderbird-android',
    owner: 'thunderbird',
    url: 'https://github.com/thunderbird/thunderbird-android',
    platform: 'github',
    description:
      'Mozilla Thunderbird의 안드로이드 이메일 클라이언트입니다. K-9 Mail을 이어받아 개발되고 있습니다.',
    contributions: [
      {
        date: '2026.08.20',
        title: '하드웨어 키보드 탭 키로 수신자 입력란을 벗어나지 못하던 버그 수정',
        summary: '탭 키를 입력란이 가로채면서 포커스가 갇히던 문제를 해결하고, 자동완성 동작을 함께 정리했습니다.',
        url: 'https://github.com/thunderbird/thunderbird-android/pull/11413',
        ref: '#11413',
        additions: 208,
        deletions: 7,
        changedFiles: 2,
      },
    ],
  },
  {
    name: 'eclipse-collections',
    owner: 'eclipse-collections',
    url: 'https://github.com/eclipse-collections/eclipse-collections',
    platform: 'github',
    description:
      '메모리 효율과 풍부한 API에 초점을 둔 Java 컬렉션 프레임워크입니다. 원시 타입 전용 자료구조와 불변 컬렉션을 제공합니다.',
    contributions: [
      {
        date: '2026.05.28',
        title: 'Java 8 Map compute* 메서드 단일 조회 최적화 및 동기화 원자성 보장',
        summary: '해시를 여러 번 조회하고 동기화 시 원자성이 깨지던 기본 구현을 단일 조회 방식으로 다시 작성했습니다.',
        url: 'https://github.com/eclipse-collections/eclipse-collections/pull/1947',
        ref: '#1947',
        additions: 678,
        deletions: 0,
        changedFiles: 6,
      },
    ],
  },
  {
    name: 'platform/frameworks/support',
    owner: 'androidx',
    url: 'https://android.googlesource.com/platform/frameworks/support',
    platform: 'gerrit',
    description:
      'Android Jetpack 라이브러리 전체를 담고 있는 AOSP 모노레포입니다. Compose Material3 컴포넌트가 여기에 포함됩니다.',
    contributions: [
      {
        date: '2026.07.31',
        title: 'Material3 Slider 썸 드래그 중 Label 숨겨지는 버그 수정',
        summary: '마우스로 슬라이더 손잡이를 끌 때 라벨이 사라지던 문제를 해결했습니다.',
        url: 'https://android-review.googlesource.com/c/platform/frameworks/support/+/4186356',
        ref: 'CL 4186356',
        additions: 64,
        deletions: 10,
        changedFiles: 2,
      },
    ],
  },
  {
    name: 'nest',
    owner: 'nestjs',
    url: 'https://github.com/nestjs/nest',
    platform: 'github',
    description:
      'TypeScript 기반의 Node.js 서버 프레임워크입니다. 데코레이터와 DI 컨테이너를 중심으로 한 모듈 구조를 제공합니다.',
    contributions: [
      {
        date: '2026.02.16',
        title: 'websocket disconnect reason 파라미터 추가',
        summary: '웹소켓 연결이 끊긴 사유를 핸들러에서 전달받을 수 있게 했습니다.',
        url: 'https://github.com/nestjs/nest/pull/16374',
        ref: '#16374',
        additions: 90,
        deletions: 5,
        changedFiles: 5,
      },
    ],
  },
  {
    name: 'spring-kafka',
    owner: 'spring-projects',
    url: 'https://github.com/spring-projects/spring-kafka',
    platform: 'github',
    description:
      'Spring 애플리케이션에서 Apache Kafka를 사용하기 위한 추상화 레이어입니다. 리스너 컨테이너와 템플릿 API를 제공합니다.',
    contributions: [
      {
        date: '2025.08.01',
        title: '테스트 코드 모듈화 리팩터링',
        summary: '리스너가 떠안고 있던 검증 로직을 분리해 테스트의 관심사를 정리했습니다.',
        url: 'https://github.com/spring-projects/spring-kafka/pull/4031',
        ref: '#4031',
        additions: 14,
        deletions: 42,
        changedFiles: 1,
      },
    ],
  },
  {
    name: 'lombok',
    owner: 'projectlombok',
    url: 'https://github.com/projectlombok/lombok',
    platform: 'github',
    description:
      'Java 보일러플레이트 코드를 애노테이션으로 대체하는 애노테이션 프로세서입니다. 컴파일 시점에 AST를 직접 조작합니다.',
    contributions: [
      {
        date: '2026.08.06',
        title: 'JDK 23 Ant 애노테이션 프로세싱 설정 문서 개선',
        summary: 'JDK 23부터 달라진 애노테이션 처리 설정을 빌드 가이드에 반영했습니다.',
        url: 'https://github.com/projectlombok/lombok/pull/4053',
        ref: '#4053',
        additions: 10,
        deletions: 1,
        changedFiles: 1,
      },
    ],
  },
]

export const totalContributions = openSourceProjects.reduce(
  (sum, project) => sum + project.contributions.length,
  0,
)
