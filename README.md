# Mock-pad

An free, online, real-time, collaborative code editor like [coderpad](https://coderpad.io). You can edit, share and run the code with your friends.
## [Live Demo](http://mockpad.lixuanqi.me/home)
## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker-compose](https://docs.docker.com/compose/install/)

### Development server

```bash
git clone https://github.com/LiXuanqi/mock-pad.git
cd mock-pad/client
ng build --prod # build artifacts and store in the /public
cd ..
docker-compose up -d # see http://127.0.0.1:3000 in browser.
```

## Deployment
The directory structure is as bellow.
```
├── client # frontend
├── executor # executor server that supports running code in docker.
└── server # backend
```

## Built With

* [Angular](https://angular.io/)
* [Express](https://www.express.com/)
* [Flask](http://flask.pocoo.org/)
* Websocket
* [Docker SDK for Python](https://docker-py.readthedocs.io/en/stable/)
* [bootstrap](https://getbootstrap.com/)
* [Ace](https://ace.c9.io/) - The High Performance Code Editor for the Web
* MongoDB, Redis

## Authors

* **Xuanqi Li** - *Initial work*

See also the list of [contributors](https://github.com/LiXuanqi/mock-pad/graphs/contributors) who participated in this project.
