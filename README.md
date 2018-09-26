# ThumbsUp (Thumbnailer generator for your images)

This project was a way of learning [ReactJS](https://reactjs.org/) ("learning by doing it").

I haven't had yet time to learn best practices so somethings might be off.

## Getting Started

### Clone project
```shell
git clone git@github.com:nffdiogosilva/thumbsup.git
cd thumbsup
```

### Setup backend:
```shell
pipenv install
cd backend/src
./manage.py migrate
./manage.py runserver
```

### Setup frontend:
```shell
cd thumbsup/frontend
yarn start
```

## License

MIT License

Copyright (c) [2018] [Nuno Diogo da Silva diogosilva.nuno(at)gmail(dot)com]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
