import os
from friday import make_app


app = make_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(port=port)