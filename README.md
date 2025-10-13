# Projeto Prático de Kubernetes: Contador de Visitas

Este repositório contém um projeto prático de estudo para a implantação de uma aplicação web simples (um contador de visitas) em um cluster Kubernetes. O objetivo é aplicar e demonstrar o uso dos principais objetos e conceitos do Kubernetes para criar uma aplicação configurável, com persistência de dados, resiliente e autoescalável.

Este projeto foi desenvolvido como parte de um processo de aprendizado sobre orquestração de contêineres e práticas de DevOps.

## 🚀 Conceitos de Kubernetes Demonstrados

Este projeto foi estruturado para colocar em prática os seguintes recursos do Kubernetes:

* **Deployment:** Para gerenciar o ciclo de vida dos Pods da aplicação, garantindo que o número desejado de réplicas esteja sempre em execução.
* **Service (`NodePort`):** Para expor a aplicação de forma estável e permitir o acesso externo ao cluster.
* **ConfigMap:** Para externalizar a configuração da aplicação (neste caso, uma mensagem de boas-vindas), permitindo alterações sem a necessidade de reconstruir a imagem do contêiner.
* **PersistentVolumeClaim (PVC):** Para solicitar armazenamento persistente, garantindo que o estado da aplicação (a contagem de visitas) não seja perdido quando um Pod é reiniciado.
* **Probes (`Liveness` e `Readiness`):** Para garantir a resiliência da aplicação, permitindo que o Kubernetes identifique e se recupere de Pods que não estejam saudáveis ou prontos para receber tráfego.
* **HorizontalPodAutoscaler (HPA):** Para escalar horizontalmente a aplicação de forma automática com base no uso de CPU, garantindo o desempenho sob carga.

## 📁 Estrutura do Projeto

```
/
├── src/
│   └── app.js             # O código da aplicação Node.js
├── package.json       # Dependências do Node.js
├── Dockerfile         # Arquivo para construir a imagem Docker da aplicação
├── kubernetes/
│   ├── deployment.yaml    # Manifesto do Deployment
│   ├── service.yaml       # Manifesto do Service
│   ├── configmap.yaml     # Manifesto do ConfigMap
│   ├── pvc.yaml           # Manifesto do PersistentVolumeClaim
│   └── hpa.yaml           # Manifesto do HorizontalPodAutoscaler
```

## 🛠️ Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas:

* [Docker](https://www.docker.com/get-started)
* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* [Minikube](https://minikube.sigs.k8s.io/docs/start/) (ou outro cluster Kubernetes local)
* Uma conta no [Docker Hub](https://hub.docker.com/) ou outro registro de contêiner

## ⚙️ Como Executar

Siga os passos abaixo para implantar a aplicação no seu cluster local.

**1. Clone o Repositório**
```bash
git clone [https://github.com/DhyogoAmerico/training-kubernetes.git](https://github.com/DhyogoAmerico/training-kubernetes.git)
cd training-kubernetes
```

**2. Build e Push da Imagem Docker**

Primeiro, construa a imagem da aplicação. Lembre-se de substituir `seu-usuario-dockerhub` pelo seu nome de usuário no Docker Hub.

```bash
docker build -t seu-usuario-dockerhub/visitor-counter:1.0 .
```

Em seguida, envie a imagem para o registro.

```bash
docker push seu-usuario-dockerhub/visitor-counter:1.0
```
**Importante:** Não se esqueça de atualizar o campo `image` no arquivo `deployment.yaml` com o nome da sua imagem.

**3. Inicie o Cluster Kubernetes**
```bash
minikube start
```

**4. Ative o Metrics Server (Necessário para o HPA)**
```bash
minikube addons enable metrics-server
```

**5. Aplique os Manifestos do Kubernetes**

Aplique todos os arquivos de configuração no seu cluster. É uma boa prática criar o ConfigMap e o PVC antes do Deployment que depende deles.

```bash
kubectl apply -f configmap.yaml
kubectl apply -f pvc.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f hpa.yaml
```

**6. Acesse a Aplicação**

Use o comando do Minikube para obter a URL do serviço e abri-lo no seu navegador.

```bash
minikube service counter-service
```

## 🔬 Verificando os Componentes

Você pode usar os seguintes comandos para verificar o status de cada objeto criado no cluster:

```bash
# Verificar os Pods em execução
kubectl get pods

# Verificar o Service e a porta NodePort
kubectl get service

# Verificar o status do Deployment
kubectl get deployment

# Verificar se o PersistentVolumeClaim foi vinculado a um Volume
kubectl get pvc

# Observar o HorizontalPodAutoscaler em ação (útil durante um teste de carga)
kubectl get hpa -w
```

---

Feito por [Dhyogo Américo](https://github.com/DhyogoAmerico).