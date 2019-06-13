docker build -t jweboy/nginx-service .
docker push jweboy/nginx-service
ssh server "docker pull jweboy/nginx-service && docker stop nginx-service || true && docker run --name nginx-service --rm -d -p 80:80 jweboy/nginx-service"
