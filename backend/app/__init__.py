__all__ = ["app", "create_app"]


def __getattr__(name):
    if name == "app":
        from flask_app import app

        return app
    if name == "create_app":
        from flask_app import create_app

        return create_app
    raise AttributeError(f"module 'app' has no attribute {name!r}")
