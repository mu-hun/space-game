# Space Game - 기초웹개발론 과제

<!-- 영상 첨부 TODO -->

아래와 같은 HTML 수정을 통해 도입한 [ES Module 시스템]을 바탕으로 코드를 역할 별 독립적인 모듈로 나누어서 작업을 했습니다.

[ES Module 시스템]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#applying_the_module_to_your_html

```diff
<html>
  <body>
-   <script src="app.js"></script>
+   <script type="module" src="app.js"></script>
  </body>
</html>
```

## 작업 과정

커밋 로그를 참고 바랍니다. 세부 작업 단계마다 커밋을 의미 있게 나누었습니다.

## 구현한 부가 기능

- 플레이어
  - [x] 자동 발사하는 보조 레이저
  - [x] 적군을 3명 섬멸할 때마다 목숨이 하나 늘어남. 기본 3개의 목숨이 주어지고, 최대 4개의 목숨까지 늘어납니다.
  - [ ] 섬멸하지 않은 적어도 하나의 적 엔디티가 화면 상에서 놓치면 게임 오버
- 플레이할 떄마다 달라지는 요소
  - [x] 직사각형 또는 역삼각형 배치 중 하나로 적군 대열이 매번 달라집니다.
  - [ ] 스테이지가 올라갈 때마다(총 3단계) 적군 갯수가 증가합니다.
  - [ ] 스테이지가 올라갈 떄마다 적군 엔디티 간 간격이 넓어집니다.

## 직접 플레이하기

<!-- 주소 TODO -->
