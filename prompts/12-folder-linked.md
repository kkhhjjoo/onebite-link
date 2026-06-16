링크 테이블과 폴더 테이블을 연결해줘
- 링크 테이블에 folder_id라는 컬럼을 추가해줘
- folder_id컬럼은 선택적 컬럼으로 설정해줘
- folder_id컬럼이 folder테이블의 id컬럼을 참조하도록 외래키로 설정해줘
- folder 테이블의 데이터가 삭제될경우(폴더 삭제) 연결된 link테이블의 folder_id를 빈 값으로 설정해줘