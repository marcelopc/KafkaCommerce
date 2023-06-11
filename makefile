include .env

.PHONY: up

up:
	docker-compose up -d

.PHONY: down

down:
	docker-compose down

.PHONY: logs

logs:
	docker-compose logs -f

.PHONY: prod
prod:
	docker-compose -f docker-compose.prod.yml up

.PHONY: prod-down
 prod-down:
	docker-compose -f docker-compose.prod.yml down