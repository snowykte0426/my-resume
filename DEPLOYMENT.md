# 배포 가이드

이 문서는 Docker를 사용하여 이력서 웹사이트를 배포하는 방법을 설명합니다.

## 사전 요구사항

- Docker (20.10 이상)
- Docker Compose (v2.0 이상)

## 빠른 시작

### Docker Compose 사용 (권장)

```bash
# 이미지 빌드 및 컨테이너 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down
```

웹사이트는 http://localhost 에서 확인할 수 있습니다.

### Docker 직접 사용

```bash
# 이미지 빌드
docker build -t my-resume:latest .

# 컨테이너 실행
docker run -d \
  --name my-resume \
  -p 80:80 \
  --restart unless-stopped \
  my-resume:latest

# 로그 확인
docker logs -f my-resume

# 중지 및 제거
docker stop my-resume
docker rm my-resume
```

## 포트 변경

기본 포트는 80입니다. 다른 포트를 사용하려면:

### Docker Compose
`docker-compose.yml` 파일에서 포트를 수정:
```yaml
ports:
  - "8080:80"  # 호스트:컨테이너
```

### Docker 직접 사용
```bash
docker run -d -p 8080:80 my-resume:latest
```

## 프로덕션 배포

### 1. 환경 변수 설정 (선택사항)

필요한 경우 `.env` 파일 생성:
```env
PORT=80
NODE_ENV=production
```

### 2. HTTPS 설정 (Nginx Proxy 사용)

실제 도메인에서 HTTPS를 사용하려면 Nginx Proxy Manager나 Traefik 같은 리버스 프록시를 사용하세요.

#### Nginx Proxy Manager 예시:
```yaml
version: '3.8'

services:
  resume:
    build: .
    container_name: my-resume
    expose:
      - "80"
    networks:
      - proxy-network

networks:
  proxy-network:
    external: true
```

### 3. 클라우드 배포

#### AWS ECS
```bash
# ECR에 이미지 푸시
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-northeast-2.amazonaws.com
docker tag my-resume:latest <account-id>.dkr.ecr.ap-northeast-2.amazonaws.com/my-resume:latest
docker push <account-id>.dkr.ecr.ap-northeast-2.amazonaws.com/my-resume:latest
```

#### Google Cloud Run
```bash
# 이미지 빌드 및 푸시
gcloud builds submit --tag gcr.io/<project-id>/my-resume

# Cloud Run에 배포
gcloud run deploy my-resume \
  --image gcr.io/<project-id>/my-resume \
  --platform managed \
  --region asia-northeast3 \
  --allow-unauthenticated
```

#### Azure Container Instances
```bash
# 이미지 빌드 및 푸시
az acr build --registry <registry-name> --image my-resume:latest .

# 컨테이너 인스턴스 생성
az container create \
  --resource-group myResourceGroup \
  --name my-resume \
  --image <registry-name>.azurecr.io/my-resume:latest \
  --dns-name-label my-resume \
  --ports 80
```

#### DigitalOcean App Platform
```bash
# doctl로 앱 생성
doctl apps create --spec .do/app.yaml
```

## Health Check

컨테이너는 자동으로 헬스체크를 수행합니다:
```bash
# 수동 헬스체크
curl http://localhost/health
```

## 문제 해결

### 빌드 실패
```bash
# 캐시 없이 다시 빌드
docker-compose build --no-cache

# 또는
docker build --no-cache -t my-resume:latest .
```

### 포트 충돌
```bash
# 사용 중인 포트 확인
sudo lsof -i :80

# 또는 다른 포트 사용
docker run -p 8080:80 my-resume:latest
```

### 로그 확인
```bash
# Docker Compose
docker-compose logs -f resume

# Docker
docker logs -f my-resume
```

### 컨테이너 재시작
```bash
# Docker Compose
docker-compose restart

# Docker
docker restart my-resume
```

## 최적화

### 이미지 크기 줄이기
현재 멀티 스테이지 빌드를 사용하여 최종 이미지 크기를 최소화했습니다.

```bash
# 이미지 크기 확인
docker images my-resume

# 예상 크기: ~40MB (nginx:alpine 기반)
```

### 빌드 속도 향상
`.dockerignore` 파일이 이미 설정되어 불필요한 파일을 제외합니다.

## 모니터링

### 컨테이너 상태 확인
```bash
docker ps
docker stats my-resume
```

### 로그 모니터링
```bash
# 실시간 로그
docker logs -f my-resume

# 최근 100줄
docker logs --tail 100 my-resume
```

## 업데이트

```bash
# 코드 수정 후
git pull

# 이미지 재빌드 및 재시작
docker-compose up -d --build

# 또는
docker build -t my-resume:latest .
docker stop my-resume
docker rm my-resume
docker run -d -p 80:80 --name my-resume my-resume:latest
```

## 백업

```bash
# 컨테이너 백업
docker commit my-resume my-resume-backup:$(date +%Y%m%d)

# 이미지 저장
docker save my-resume:latest | gzip > my-resume-backup.tar.gz

# 이미지 복원
docker load < my-resume-backup.tar.gz
```