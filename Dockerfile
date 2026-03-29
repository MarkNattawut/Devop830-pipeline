name: SIZE N TAG App CI/CD

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build-and-push-docker-image:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          no-cache: true
          tags: |
            marknattawut/devop830-pipeline:latest
            marknattawut/devop830-pipeline:${{ github.sha }}

  deploy:
    needs: build-and-push-docker-image
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v0.1.10
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            docker pull marknattawut/devop830-pipeline:latest
            docker stop sizentag-app || true
            docker rm sizentag-app || true
            docker run -d \
              --name sizentag-app \
              -p 80:4000 \
              --restart always \
              marknattawut/devop830-pipeline:latest
            docker image prune -af
