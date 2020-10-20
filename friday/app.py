import os
from friday import make_app


app = make_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(use_debugger=False, use_reloader=False, host="0.0.0.0", port=port)
